var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");
const { Pool} = require('pg');
const pool = new Pool({
  user: 'cdgvxvol',
  host: 'abul.db.elephantsql.com',
  database: 'cdgvxvol',
  password: 'O5Z0UXgVHLwlvj_3IcAnTzAnB8m19dEe',
  port: 5432,
  max:10,
  idleTimeoutMillis: 30000
})

var foot = {
  name: "DOG SHOP KODA",
  email: "dogshopkoda@gmail.com",
  tel: "+387 62 530 664"
}

let query = {
  prikaziRase: function (req,res,next){
    pool.query('select * from rasa', (err,result) => {
      req.rase = result.rows;
      next();
    })
  },
  prikazPasa: function (req,res,next){
    pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad,u.drzava as drzava, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase ;`,
        (err,result) => {
            req.psi = result.rows;
            next();
        })
  },
    prikazPasaPoDatumu: function (req,res,next) {
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, u.drzava as drzava,r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase order by pas.datum_dodavanja;`,
            (err, result) => {
                req.psiOrdered = result.rows;
                next();
            });
    },
    prikazPsa: function (req,res,next){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, u.drzava as drzava,r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase  where id_psa = $1 ;`,
            [req.params.ide],(err,result) => {
                req.pas = result.rows;
                next();
            })
    },
    prikaziIzdvojene: function (req,res,next) {
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, u.drzava as drzava,r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where pas.izdvojen = 'Da'`,
            (err, result) => {
                req.izdvojeni = result.rows;
                next();
            });
    },
    prikaziTrgovcaPoId: function (req, res, next) {
        pool.query(`select * from uzgajivac where id = $1`, [req.params.ide], (err, result) => {
            req.podaci = result.rows;
            next();
        })
    },
}



/* GET home page. */
router.get('/', query.prikazPasa, query.prikaziIzdvojene,query.prikazPasaPoDatumu,function(req, res, next) {
  res.render('index', {footer: foot, psi:req.psi, psiOrdered: req.psiOrdered,izdvojeni:req.izdvojeni} );
});

router.get('/proizvodi', query.prikaziRase, query.prikazPasa,function(req, res, next) {
  res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi});
});

router.get('/opisPsa/:ide',query.prikaziIzdvojene,query.prikazPsa,query.prikazPasa, function(req, res, next) {
  res.render('opisPsa', {footer: foot, psi:req.psi, pas:req.pas[0], izdvojeni : req.izdvojeni});
});

router.get('/blog', function(req, res, next) {
  res.render('blog', {footer: foot} );
});

router.get('/about', function (req,res){
  res.render('about', {footer: foot});
});

router.get('/kontakt', function (req,res){
  res.render('forms/kontakt',{greska1:false});
});

router.get('/opisTrgovca/:ide', query.prikaziTrgovcaPoId,function (req,res){
    console.log(req.podaci);
    res.render('prikazTrgovca',{podaci:req.podaci[0]});
});


router.post('/proizvodi',query.prikaziRase,query.prikazPasaPoDatumu, query.prikazPasa,function (req,res){
    let drzava = req.body.drzava;
    let cijena = req.body.cijena;
    let rasa = req.body.rasa;
    console.log(drzava);
    console.log(rasa);
    if(drzava === '' && cijena === '' && rasa === ''){
      res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi,psiOrdered: req.psiOrdered});
    }
    else if(drzava !== '' && cijena !== '' && rasa !== ''){
      if( cijena === 'Usvajanje'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena = 0 and r.ime like $2 ; `
        , [drzava,'%'+rasa+'%'],(err,result) =>{
          if(err){console.log(err)} else{
            req.psi2 = result.rows;
            res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
          }
        });
      }
      else if(cijena === 'do 300KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena > 0 and cijena < 300 and r.ime like $2 ; `
            , [drzava,'%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });
      }
      else if(cijena ==='300 do 500KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena >= 300 and cijena < 500 and r.ime like $2 ; `
            , [drzava,'%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else if(cijena === '500 do 1000KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena >= 500 and cijena < 1000 and r.ime like $2 ; `
            , [drzava,'%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else if(cijena === '1000 do 3000KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena >= 1000 and cijena < 3000 and r.ime like $2 ; `
            , [drzava,'%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else{
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena >= 3000 and r.ime like $2 ; `
            , [drzava,'%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
    }
    else if(drzava !== '' && cijena !== '' && rasa === ''){
      if( cijena === 'Usvajanje'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena = 0 ; `
            , [drzava],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });
      }
      else if(cijena === 'do 300KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena > 0 and cijena < 300; `
            , [drzava],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });
      }
      else if(cijena ==='300 do 500KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena >= 300 and cijena < 500  ; `
            , [drzava],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else if(cijena === '500 do 1000KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena >= 500 and cijena < 1000  ; `
            , [drzava],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else if(cijena === '1000 do 3000KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena >= 1000 and cijena < 3000  ; `
            , [drzava],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else{
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and cijena >= 3000 ; `
            , [drzava],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
    }
    else if(drzava !== '' && cijena === '' && rasa !== ''){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1  and r.ime like $2; `
            , [drzava,'%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });
    }
    else if(drzava !== '' && cijena === '' && rasa === ''){
      pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where u.drzava = $1; `
          , [drzava],(err,result) =>{
            if(err){console.log(err)} else{
              req.psi2 = result.rows;
              res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
            }
          });
    }
    else if(drzava === '' && cijena === '' && rasa !== ''){
      pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where r.ime like $1; `
          , ['%'+rasa+'%'],(err,result) =>{
            if(err){console.log(err)} else{

              req.psi2 = result.rows;
              console.log(rasa);
              res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
            }
          });
    }
    else if(drzava === '' && cijena !== '' && rasa === ''){
      if( cijena === 'Usvajanje'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where cijena = 0 ; `
            ,(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });
      }
      else if(cijena === 'do 300KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena > 0 and cijena < 300; `
            ,(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });
      }
      else if(cijena ==='300 do 500KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena >= 300 and cijena < 500  ; `
            ,(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else if(cijena === '500 do 1000KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena >= 500 and cijena < 1000  ; `
            ,(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else if(cijena === '1000 do 3000KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena >= 1000 and cijena < 3000  ; `
            ,(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else{
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena >= 3000 ; `
            ,(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
    }
    else if(drzava === '' && cijena !== '' && rasa !== ''){
      if( cijena === 'Usvajanje'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena = 0 and r.ime = $1 ; `
            , [rasa],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });
      }
      else if(cijena === 'do 300KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena > 0 and cijena < 300 and r.ime like $1 ; `
            , ['%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });
      }
      else if(cijena ==='300 do 500KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where cijena >= 300 and cijena < 500 and r.ime like $1; `
            , ['%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else if(cijena === '500 do 1000KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where cijena >= 500 and cijena < 1000 and r.ime like $1; `
            , ['%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else if(cijena === '1000 do 3000KM'){
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena >= 1000 and cijena < 3000 and (r.ime like $1) ; `
            , ['%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
      else{
        pool.query(`select pas.* , u.ime_uzgajivacnice, u.grad as grad, r.ime as rasa from pas inner join uzgajivac u on u.id = pas.id_uzgajivaca inner join rasa r on r.id_rase = pas.id_rase where  cijena >= 3000 and r.ime like $1 ; `
            , ['%'+rasa+'%'],(err,result) =>{
              if(err){console.log(err)} else{
                req.psi2 = result.rows;
                res.render('proizvodi', {footer: foot, rase: req.rase, psi:req.psi2});
              }
            });

      }
    }

});

router.post('/poslano', function (req,res){
  if(req.body.email === '' || req.body.naslov === '' || req.body.tekst === ''){
    res.render('forms/kontakt',{greska1:true});
  }else{
    pool.query(`insert into poruke(mail,naslov,tekst) values ($1,$2,$3)`, [req.body.email,req.body.naslov,req.body.tekst], ()=>{
      res.redirect('/');
    })
   }
});


module.exports = router;
