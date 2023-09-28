var express = require('express');
var router = express.Router();
const { Pool} = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    console.log(req.cookies.jwt);
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,req.params.ide.toString(),(err,decodedToken) => {
            if(err){
                console.log(err.message);
                res.render('forms/login', {greska:false,greska2:false});
            } else{
                next();
            }
        });
    }else{
        res.render('forms/login', {greska:false,greska2:false});
    }
}

const createToken = (email,id) => {
    return jwt.sign({email},id.toString(),{
        expiresIn: 2 * 60 * 60
    })
}


const fileUpload = require('express-fileupload');
router.use(fileUpload());
const pool = new Pool({
    user: 'cdgvxvol',
    host: 'abul.db.elephantsql.com',
    database: 'cdgvxvol',
    password: 'O5Z0UXgVHLwlvj_3IcAnTzAnB8m19dEe',
    port: 5432,
    max:10,
    idleTimeoutMillis: 30000
})
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

var obj = {
    prikaziPodatkePoId: function (req, res, next) {
        pool.query(`select * from uzgajivac where id = $1`, [req.params.ide], (err, result) => {
            req.podaci = result.rows;
            next();
        })
    },
    prikaziRase: function (req,res,next){
        pool.query('select * from rasa', (err,result) => {
            req.rase = result.rows;
            next();
        })
    },
    prikaziPsePoId: function (req,res,next){
        pool.query(`select pas.ime as ime, pas.cijena as cijena, r.ime as rasa, u.ime_uzgajivacnice as uzgajivac, pas.slika as slika,
                    pas.datum_rodjenja as datum, pas.opis as opis, pas.spol as spol, pas.mjesanac as mjesanac, pas.id_psa as id_psa
                    from pas inner join rasa r on r.id_rase = pas.id_rase inner join uzgajivac u on u.id = pas.id_uzgajivaca where id_uzgajivaca = $1`, [req.params.ide], (err,result) => {
            req.psi = result.rows;
            next();
        })
    },
    prikaziPsaPoId: function (req,res,next){
        pool.query(`select pas.id_psa as id_psa, pas.ime as ime, pas.cijena as cijena, r.ime as rasa,r.id_rase as id_rase,pas.slika as slika,
                    pas.datum_rodjenja as datum, pas.opis as opis, pas.spol as spol, pas.mjesanac as mjesanac, pas.id_psa as id_psa  from pas inner join rasa r on r.id_rase = pas.id_rase where pas.id_psa = $1`, [req.params.ideP],(err,result) => {
            req.pas = result.rows;
            next();
        })
    }
}

var foot = {
    name: "DOG SHOP KODA",
    email: "dogshopkoda@gmail.com",
    tel: "+387 62 530 664"
}



router.get('/home/:ide',auth,obj.prikaziPodatkePoId,obj.prikaziPsePoId ,function (req,res){
    res.render('uzgajivac/home', {info : req.podaci[0], psi : req.psi, footer:foot});
});

router.get('/register', function(req, res ) {
    res.render('forms/registerUzgajivac', {greska1:false, greska2:false});
});

router.get('/login', function(req, res) {
    res.render('forms/login', {greska:false,greska2:false});
});

router.get('/update/:ide',auth,obj.prikaziPodatkePoId,function (req,res){
    res.render('forms/update', {podaci:req.podaci[0]})
})

router.get('/updatePsa/:ide/:ideP',auth,obj.prikaziPodatkePoId,obj.prikaziPodatkePoId,obj.prikaziRase,obj.prikaziPsaPoId,function (req,res){
    res.render('forms/urediPsa', {podaci:req.podaci[0], psi:req.psi,rase:req.rase, greska:false, pas:req.pas[0]})
})

router.get('/dodajPsa/:ide',auth,obj.prikaziPodatkePoId,obj.prikaziRase,function (req,res){

    res.render('forms/dodajPsa', {podaci:req.podaci[0], rase:req.rase, greska:false})
})

router.post('/registered', function (req,res){

    let podaci = req.body;
    if(podaci.imeUzg === '' || podaci.ime ==='' || podaci.prezime === '' || podaci.grad === '' || podaci.drzava  === '' || podaci.adresa === '' || podaci.brTel === '' || podaci.email === '' || podaci.password === '' || podaci.opis === ''){
        res.render('forms/registerUzgajivac', {greska1:true, greska2:false});
    }
    else{
        pool.query('select * from uzgajivac where email = $1', [podaci.email], (err,result)=>{
            if(result.rows.length !== 0){
                res.render('forms/registerUzgajivac', {greska1:false, greska2:true});
            }
            else{
                let pass = bcrypt.hashSync(req.body.password,5);
                pool.query(`insert into uzgajivac(ime_uzgajivacnice, ime, prezime, grad, drzava, adresa_stanovanja, broj_telefona, email, lozinka, opis)
                    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                    [podaci.imeUzg,podaci.ime,podaci.prezime,podaci.grad,podaci.drzava,podaci.adresa,podaci.brTel,podaci.email,pass,podaci.opis],
                    (err,result) => {
                        res.redirect('/trgovac/login');
                    })
            }
        })
    }
});

router.post('/loged', function (req,res){

    if(req.body.email === '' || req.body.password === ''){
        res.render('forms/login', {greska:true,greska2:false})
    }else{
        pool.query('select * from uzgajivac', (err,result) => {
            uzgajivaci = result.rows;
            let podaci;
            let brojac = 0 ;
            for(let i = 0; i < uzgajivaci.length ; i++){
                if(req.body.email === uzgajivaci[i].email &&  bcrypt.compareSync(req.body.password, uzgajivaci[i].lozinka)){
                    podaci = uzgajivaci[i];
                    brojac++;
                    break;
                }
            }
            if(brojac !== 0){
                if(podaci.blokiran === 'Da'){
                    res.render('forms/login', {greska:false,greska2:true})
                }else{
                    const token = createToken(podaci.email,podaci.id);
                    res.cookie('jwt',token,{httpOnly:true});
                    res.redirect('/trgovac/home/' + podaci.id);
                }

            }else {
                res.render('forms/login', {greska:true,greska2:false})
            }
        })
    }
});

router.post('/updated/:ide', function (req,res){
    let imeUzg = req.body.imeUzg;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let grad = req.body.grad;
    let drzava = req.body.drzava;
    let adresa = req.body.adresa;
    let brTel = req.body.brTel;
    let email = req.body.email;
    let password = req.body.password;
    let opis = req.body.opis;
    if(password === '' ){
        pool.query(`update uzgajivac set ime_uzgajivacnice = $1, ime = $2, prezime = $3, grad = $4, drzava = $5, adresa_stanovanja = $6, broj_telefona = $7, email = $8, opis = $9 where id = $10`,
            [imeUzg,ime,prezime,grad,drzava,adresa,brTel,email,opis,req.params.ide],(err,result) => {
                res.redirect('/trgovac/home/'+ req.params.ide);
            })
    } else{
        pool.query(`update uzgajivac set ime_uzgajivacnice = $1, ime = $2, prezime = $3, grad = $4, drzava = $5, adresa_stanovanja = $6, broj_telefona = $7, email = $8, lozinka = $9, opis = $10 where id = $11`,
            [imeUzg,ime,prezime,grad,drzava,adresa,brTel,email,password,opis,req.params.ide],(err,result) => {
                res.redirect('/trgovac/home/'+ req.params.ide);
            })
    }
});

router.post('/updatedPas/:ide/:ideP', function(req,res){

    let podaci = req.body;


    if(req.files){
        let sampleFile = req.files.slika;
        let extension = "." + sampleFile.mimetype.substring(6);
        let imeSlike = bcrypt.hashSync(sampleFile.name, 10) + extension;

        for (let i = 0; i < imeSlike.length; i++) {
            if (imeSlike[i] === '/' || imeSlike === ',') {
                imeSlike = setCharAt(imeSlike, i, 'A');
            }
        }
        let uploadPath = __dirname + '/../public/images/' + imeSlike;
        sampleFile.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
        });
        if(podaci.datum_rodjenja !== '') {
            pool.query(`update pas set ime = $1, id_rase = $2, cijena = $3, datum_rodjenja = $4, opis = $5, mjesanac = $6, slika = $7 where id_psa = $8`, [podaci.ime, podaci.rasa, podaci.cijena, podaci.datum_rodjenja, podaci.opis, podaci.mjesanac, imeSlike,req.params.ideP],
                (err, result) => {
                    res.redirect('/trgovac/home/' + req.params.ide);
                });
        }else{
            pool.query(`update pas set ime = $1, id_rase = $2, cijena = $3, opis = $4, mjesanac = $5, slika = $6 where id_psa = $7`, [podaci.ime, podaci.rasa, podaci.cijena, podaci.opis, podaci.mjesanac, imeSlike,req.params.ideP],
                (err, result) => {
                    res.redirect('/trgovac/home/' + req.params.ide);
                });
        }
    }else{
        if(podaci.datum_rodjenja !== '') {
            pool.query(`update pas set ime = $1, id_rase = $2, cijena = $3, datum_rodjenja = $4, opis = $5, mjesanac = $6 where id_psa = $7 where id_psa = $8`, [podaci.ime, podaci.rasa, podaci.cijena, podaci.datum_rodjenja, podaci.opis, podaci.mjesanac, req.params.ideP],
                (err, result) => {
                    res.redirect('/trgovac/home/' + req.params.ide);
                });
        }else{
            pool.query(`update pas set ime = $1, id_rase = $2, cijena = $3, opis = $4, mjesanac = $5 where id_psa = $6`, [podaci.ime, podaci.rasa, podaci.cijena, podaci.opis, podaci.mjesanac,req.params.ideP],
                (err, result) => {
                    res.redirect('/trgovac/home/' + req.params.ide);
                });
        }

    }
});

router.post('/dodan/:ide',obj.prikaziPodatkePoId,obj.prikaziRase, function (req,res){

    let uploadPath,sampleFile,imeSlike;
    let pas = req.body;
    if(pas.ime === '' || pas.cijena === '' || pas.datum_rodjenja === '' || pas.opis === '' ){
        res.render('forms/dodajPsa', {podaci:req.podaci[0], rase:req.rase, greska:true})
    }else {
        if (!req.files || Object.keys(req.files).length === 0) {
            imeSlike = null;
            console.log("TUUUUUUU")
        } else {
            console.log("Ovdjeeeeeee")
            sampleFile = req.files.slika;
            let extension = "." + sampleFile.mimetype.substring(6);
            imeSlike = bcrypt.hashSync(sampleFile.name, 10) + extension;

            for (let i = 0; i < imeSlike.length; i++) {
                if (imeSlike[i] === '/' || imeSlike === ',') {
                    imeSlike = setCharAt(imeSlike, i, 'A');
                }
            }
            uploadPath = __dirname + '/../public/images/' + imeSlike;
            sampleFile.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);
            });
        }

        let nd = pas.datum_rodjenja.substring(8,10) + '.' + pas.datum_rodjenja.substring(5,7) + '.' + pas.datum_rodjenja.substring(0,4);
        let nr = parseInt(pas.rasa);
        let nc = parseInt(pas.cijena);
        pool.query(`insert into pas (ime,id_rase,cijena,datum_rodjenja,opis,id_uzgajivaca,spol,mjesanac,slika,datum_dodavanja) values($1,$2,$3,$4,$5,$6,$7,$8,$9, now()) `,
            [pas.ime,nr,nc,nd,pas.opis,parseInt(req.params.ide),pas.spol,pas.mjesanac, imeSlike],(err,result) => {
                if(err){console.log(err)}
                else {
                    res.redirect('/trgovac/home/' + req.params.ide);
                }
            });
    }
})

router.post('/deleted/:ide/:ideP', function (req,res){
    pool.query(`delete from pas where id_psa = $1`,[req.params.ideP], (err,result) => {
        res.redirect('/trgovac/home/'+ req.params.ide);
    });
});

router.get('/logout',function (req,res,next){
    res.cookie('jwt','');
    res.redirect('/');
});





module.exports = router;