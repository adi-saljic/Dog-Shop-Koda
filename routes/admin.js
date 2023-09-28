var express = require('express');
var router = express.Router();
const { Pool} = require('pg');


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = new Pool({
  user: 'cdgvxvol',
  host: 'abul.db.elephantsql.com',
  database: 'cdgvxvol',
  password: 'O5Z0UXgVHLwlvj_3IcAnTzAnB8m19dEe',
  port: 5432,
  max:10,
  idleTimeoutMillis: 30000
})

const auth = (req,res,next) => {
  console.log(req.cookies.jwt);
  const token = req.cookies.adm;
  if(token){
    jwt.verify(token,"adminSecret",(err,decodedToken) => {
      if(err){
        console.log(err.message);
        res.render('forms/loginAdmin', {greska:false});
      } else{
        next();
      }
    });
  }else{
    res.render('forms/loginAdmin', {greska:false});
  }
}

const createToken = (email) => {
  return jwt.sign({email},"adminSecret",{
    expiresIn: 2 * 60 * 60
  })
}

let query = {
  trgovciBrojPasa: function (req,res,next){
    pool.query(`select u.ime_uzgajivacnice as ime, u.grad as grad, u.drzava as drzava, count(*) as broj from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca
                group by u.ime_uzgajivacnice, u.grad, u.drzava;`,(err,result) =>{
      if(err){
        console.log(err);
      }else{
        req.trgovciBroj = result.rows;
        next();
      }
    })
  },
  trgovci: function (req,res,next){
    pool.query(`select * from uzgajivac`,(err,result) => {
      if(err){
        console.log(err)
      }else{
        req.trgovci = result.rows;
        next();
      }
    })
  },
  poruke: function (req,res, next){
    pool.query(`select * from poruke`,(err,result) => {
      if(err){
        console.log(err);
      }else{
        req.poruke = result.rows;
        next();
      }
    });
  },
  prikaziPodatkePoId: function (req, res, next) {
    pool.query(`select * from uzgajivac where id = $1`, [req.params.ide], (err, result) => {
      req.podaci = result.rows;
      next();
    })
  },
}

/* GET home page. */
router.get('/',auth, query.poruke,query.trgovci,function(req, res, next) {
  res.render('admin/home', {trgovci: req.trgovci, poruke: req.poruke} );
});

router.get('/login', function(req, res) {
  res.render('forms/loginAdmin', {greska:false});
});

router.post('/deleteMess/:ide',query.poruke,query.trgovci,function(req,res){
  pool.query(`delete from poruke where id_poruke = $1`, [req.params.ide], (err,result)=>{
    if(err){
      console.log(err)
    }else{

    }
  })
});

router.get('/prikazTrgovca/:ide',query.prikaziPodatkePoId, function (req,res){
  console.log(req.podaci);
  res.render('admin/prikazTrgovca',{podaci:req.podaci[0]});
});

router.post('/deleteTrgovac/:ide',function (req,res){
  pool.query(`delete from pas where id_uzgajivaca = $1`,[req.params.id],(err,result) =>{
    if(err){
      console.log(err);
    }else{
      pool.query(`delete from uzgajivac where id = $1`, [req.params.ide],(err,result) => {
        if(err){
          console.log(err);
        }else{
          res.redirect('/admin');
        }
      })
    }
  })

});

router.post('/blockTrgovac/:ide', function (req,res){
  console.log("Tuuuuu")
  pool.query(`update uzgajivac set blokiran = $1 where id = $2`, ['Da',req.params.ide], (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/admin');
    }
  })
});


router.post('/loged', function (req,res){
  console.log(req.body)
  if(req.body.email === '' || req.body.password === ''){
    res.render('forms/loginAdmin', {greska:true});
  }else{
    pool.query('select * from admin', (err,result) => {
      admin = result.rows[0];
      console.log(admin);
      if(req.body.email === admin.username &&  bcrypt.compareSync(req.body.password, admin.pass)){
        const token = createToken(req.body.email);
        res.cookie('adm',token,{httpOnly:true});
        res.redirect('/admin');

      }else {
        res.render('forms/loginAdmin', {greska:true})
      }
    })
  }
});

// router.get('/dodan',function (req,res){
//   pool.query(`insert into admin(userName,pass) values ('admin', $1)`,[bcrypt.hashSync('admin',5)],(err,result)=>{
//     if(err){
//       console.log(err);
//     }
//     else{
//       res.sendStatus(200);
//     }
//   })
// })

router.get('/logout',function (req,res,next){
  res.cookie('adm','');
  res.redirect('/');
});





module.exports = router;
