var express = require('express');
var router = express.Router();
const { Pool} = require('pg');


const pool = new Pool({
    user: 'cdgvxvol',
    host: 'abul.db.elephantsql.com',
    database: 'cdgvxvol',
    password: 'O5Z0UXgVHLwlvj_3IcAnTzAnB8m19dEe',
    port: 5432,
    max:10,
    idleTimeoutMillis: 30000
});

var foot = {
    name: "DOG SHOP KODA",
    email: "dogshopkoda@gmail.com",
    tel: "+387 62 530 664"
};

let karakt= {
    naslovi: ["Prilagodljivost","Ljubaznost","Zdravlje i njega dlake", "Mogućnost treniranja", "Fizičke potrebe"],
    ostalo: ["Život u stanu","Pogodan za nove vlasnike","Koliko je osjetljiv","Toleriše usamljenost","Otpornost na hladnoću", "Otpornost na toplotu",
            "Vjernost porodici","Pogodan za djecu","Prijateljstvo sa drugim psima", "Prijateljstvo sa strancima",
            "Količina linanja","Koliko slini","Njega dlake","Generalno zdravlje","Potencijal gojenja", "Veličina",
            "Pogodan za treniranje","Inteligencija","Sposobnost lova","Potencijal lajanja ili zavijanja","Mogućnost lutanja",
            "Nivo energije","Potreba za kretanjem","Volja za igrom"
    ]
};

let query = {
    prikaziSort :function (req,res,next){
            pool.query(`select * from rasa order by ime`, (err, result) => {
                if(err){
                    console.log(err);
                }else{
                    req.raseSort = result.rows;
                    next();
                }
            });
    },
    prikaziRasuPoId: function (req,res,next){
        pool.query(`select * from rasa where id_rase = $1`,[req.params.ide],(err,result) => {
            if(err){
                console.log(err);
            }
            else{
                req.rasa = result.rows[0];
                next();
            }
        })
    },
    A : function (req,res,next){
        pool.query(`select * from rasa where ime like 'A%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.A = result.rows;
                next();
            }
        })
    },
    B : function (req,res,next){
        pool.query(`select * from rasa where ime like 'B%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.B = result.rows;
                next();
            }
        })
    },
    C : function (req,res,next){
        pool.query(`select * from rasa where ime like 'C%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.C = result.rows;
                next();
            }
        })
    },
    D : function (req,res,next){
        pool.query(`select * from rasa where ime like 'D%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.D = result.rows;
                next();
            }
        })
    },
    E : function (req,res,next){
        pool.query(`select * from rasa where ime like 'E%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.E = result.rows;
                next();
            }
        })
    },
    F : function (req,res,next){
        pool.query(`select * from rasa where ime like 'F%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.F = result.rows;
                next();
            }
        })
    },
    G : function (req,res,next){
        pool.query(`select * from rasa where ime like 'G%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.G = result.rows;
                next();
            }
        })
    },
    H : function (req,res,next){
        pool.query(`select * from rasa where ime like 'H%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.H = result.rows;
                next();
            }
        })
    },
    I : function (req,res,next){
        pool.query(`select * from rasa where ime like 'I%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.I = result.rows;
                next();
            }
        })
    },
    J : function (req,res,next){
        pool.query(`select * from rasa where ime like 'J%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.J = result.rows;
                next();
            }
        })
    },
    K : function (req,res,next){
        pool.query(`select * from rasa where ime like 'K%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.K = result.rows;
                next();
            }
        })
    },
    L : function (req,res,next){
        pool.query(`select * from rasa where ime like 'L%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.L = result.rows;
                next();
            }
        })
    },
    M : function (req,res,next){
        pool.query(`select * from rasa where ime like 'M%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.M = result.rows;
                next();
            }
        })
    },
    N : function (req,res,next){
        pool.query(`select * from rasa where ime like 'N%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.N = result.rows;
                next();
            }
        })
    },
    O : function (req,res,next){
        pool.query(`select * from rasa where ime like 'O%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.O = result.rows;
                next();
            }
        })
    },
    P : function (req,res,next){
        pool.query(`select * from rasa where ime like 'P%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.P = result.rows;
                next();
            }
        })
    },
    R : function (req,res,next){
        pool.query(`select * from rasa where ime like 'R%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.R = result.rows;
                next();
            }
        })
    },
    S : function (req,res,next){
        pool.query(`select * from rasa where ime like 'S%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.S = result.rows;
                next();
            }
        })
    },
    T : function (req,res,next){
        pool.query(`select * from rasa where ime like 'T%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.T = result.rows;
                next();
            }
        })
    },
    U : function (req,res,next){
        pool.query(`select * from rasa where ime like 'U%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.U = result.rows;
                next();
            }
        })
    },
    V : function (req,res,next){
        pool.query(`select * from rasa where ime like 'V%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.V = result.rows;
                next();
            }
        })
    },
    W : function (req,res,next){
        pool.query(`select * from rasa where ime like 'W%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.W = result.rows;
                next();
            }
        })
    },
    X : function (req,res,next){
        pool.query(`select * from rasa where ime like 'X%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.X = result.rows;
                next();
            }
        })
    },
    Y : function (req,res,next){
        pool.query(`select * from rasa where ime like 'Y%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.Y = result.rows;
                next();
            }
        })
    },
    Z : function (req,res,next){
        pool.query(`select * from rasa where ime like 'Z%'`,(err,result) =>{
            if(err){
                console.log(err);
            }
            else{
                req.Z = result.rows;
                next();
            }
        })
    },

}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('rase/odabir',{greska: false,greska2:false});
});

router.get('/sveRase',query.prikaziSort,query.A,query.B,query.C,query.D,query.E,query.F,query.G,query.H,
    query.I,query.J,query.K,query.L,query.M,query.N,query.O,query.P,
    query.R,query.S,query.T,query.U,query.V,query.W,query.X,query.Y,query.Z,(req,res)=>{
    console.log(req.raseSort);
    res.render('rase/sveRase2',{raseSort:req.raseSort,footer:foot,A:req.A,B:req.B,C:req.C,E:req.E,F:req.F,D:req.D,G:req.G,H:req.H,
                                            I:req.I,J:req.J,K:req.K,L:req.L,M:req.M,N:req.N,O:req.O,P:req.P,R:req.R,S:req.S,T:req.T,U:req.U,V:req.V,W:req.W,X:req.X,Y:req.Y,Z:req.Z});
});

router.get("/rasa/:ide",query.prikaziRasuPoId,function (req,res){
   res.render('rase/rasa',{rasa:req.rasa,footer:foot, naslovi:karakt.naslovi,osobine:karakt.ostalo})
});

router.post('/odabran',function (req,res){
    console.log(req.body);
    let kat = req.body.kategorija;
    let kat2 = req.body.kategorija2;
    let kat3  = req.body.kategorija3;
    console.log(kat);
    if(!kat3){
        if(!kat && !kat2){
            res.render('rase/odabir',{greska: true,greska2:false});
        }
        else if(!kat2){
            if(typeof kat === 'string'){
                let str = "select * from rasa where " + kat + " = '3' or " + kat + " = '4' or " + kat + " ='5'";
                pool.query(str, (err,result) => {
                    console.log(result.rows);
                    if(err){
                        console.log(err);
                    }else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                });
            }
            else{
                let queryString = 'select * from rasa where ';
                for(let i =0; i < kat.length-1; i++){
                    queryString += "("+ kat[i] + " = '3' or " + kat[i] + " = '4' or " + kat[i] + " ='5') and "
                }
                queryString+= "("+ kat[kat.length-1] + " = '3' or " + kat[kat.length-1] + " = '4' or " + kat[kat.length-1] + " ='5')";
                console.log(queryString);
                pool.query(queryString,(err,result) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                })
            }
        }
        else if(!kat){
            if(typeof kat2 === 'string'){
                let str = "select * from rasa where " + kat2 + " = '1' or " + kat2 + " = '2'";
                pool.query(str, (err,result) => {
                    console.log(result.rows);
                    if(err){
                        console.log(err);
                    }else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                });
            }
            else{
                let queryString = 'select * from rasa where ';
                for(let i =0; i < kat2.length-1; i++){
                    queryString += "("+ kat2[i] + " = '1' or " + kat2[i] + " = '2') and "
                }
                queryString+= "("+ kat2[kat2.length-1] + " = '1' or " + kat2[kat2.length-1] + " = '2')";
                console.log(queryString);
                pool.query(queryString,(err,result) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                })
            }
        }
        else{
            if(typeof kat === 'string' && typeof kat2 === 'string'){
                let queryString = "select * from rasa where (" + kat2 + " = '1' or " + kat2 + " = '2') and ("+ kat + " = '3' or " + kat + " = '4' or " + kat + " ='5')";
                pool.query(queryString, (err,result) => {
                    console.log(result.rows);
                    if(err){
                        console.log(err);
                    }else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                });
            }
            else if(typeof kat === 'string'){
                let queryString = "select * from rasa where (" + kat + " = '3' or " + kat + " = '4' or " + kat + " ='5')";

                for(let i =0; i < kat2.length; i++){
                    queryString += " and ("+ kat2[i] + " = '1' or " + kat2[i] + " = '2')"
                }

                pool.query(queryString, (err,result) => {
                    if(err){
                        console.log(err);
                    }else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                });

            }
            else if(typeof kat2 === 'string'){
                let queryString = "select * from rasa where (" + kat2 + " = '1' or " + kat2 + " = '2')";
                for(let i =0; i < kat.length; i++){
                    queryString += "and ("+ kat[i] + " = '3' or " + kat[i] + " = '4' or " + kat[i] + " ='5')"
                }

                pool.query(queryString, (err,result) => {
                    console.log(result.rows);
                    if(err){
                        console.log(err);
                    }else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                });
            }
            else{
                let queryString = 'select * from rasa where '
                for(let i =0; i < kat2.length-1; i++){
                    queryString += "("+ kat2[i] + " = '1' or " + kat2[i] + " = '2') and "
                }
                queryString+= "("+ kat2[kat2.length-1] + " = '1' or " + kat2[kat2.length-1] + " = '2')";
                for(let i =0; i < kat.length; i++){
                    queryString += "and ("+ kat[i] + " = '3' or " + kat[i] + " = '4' or " + kat[i] + " ='5')"
                }
                pool.query(queryString, (err,result) => {
                    console.log(result.rows);
                    if(err){
                        console.log(err);
                    }else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                });

            }
        }
    }
    else{
        if(typeof kat3 !== 'string'){
            res.render('rase/odabir',{greska: false,greska2: true});
        }
        else{

            let velicinaString = "select * from rasa where velicina ="
            if(kat3 === 'jako_mali'){
                velicinaString+="'1' ";
            }
            else if(kat3 === 'mali'){
                velicinaString+="'2' ";
            }
            else if(kat3 === 'srednji'){
                velicinaString+="'3' ";
            }
            else if(kat3 === 'veliki'){
                velicinaString+="'4' ";
            }
            else{
                velicinaString+="'5' ";
            }

            if(!kat && !kat2){
                pool.query(velicinaString, (err,result) => {
                    if(err){
                        console.log(err);
                    }else{
                        if(result.rows.length === 0){
                            res.render('rase/error',{footer:foot});
                        }
                        else{
                            req.raseSort = result.rows;
                            res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                        }
                    }
                });
            }
            else if(!kat2){
                if(typeof kat === 'string'){
                    let str = " and (" + kat + " = '3' or " + kat + " = '4' or " + kat + " ='5')";
                    pool.query(velicinaString + str, (err,result) => {
                        console.log(result.rows);
                        if(err){
                            console.log(err);
                        }else{
                            if(result.rows.length === 0){
                                res.render('rase/error',{footer:foot});
                            }
                            else{
                                req.raseSort = result.rows;
                                res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                            }
                        }
                    });
                }
                else{
                    let queryString = velicinaString + " and ";
                    for(let i =0; i < kat.length-1; i++){
                        queryString += "("+ kat[i] + " = '3' or " + kat[i] + " = '4' or " + kat[i] + " ='5') and "
                    }
                    queryString+= "("+ kat[kat.length-1] + " = '3' or " + kat[kat.length-1] + " = '4' or " + kat[kat.length-1] + " ='5')";
                    console.log(queryString);
                    pool.query(queryString,(err,result) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            if(result.rows.length === 0){
                                res.render('rase/error',{footer:foot});
                            }
                            else{
                                req.raseSort = result.rows;
                                res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                            }
                        }
                    })
                }
            }
            else if(!kat){
                if(typeof kat2 === 'string'){
                    let str = " and (" + kat2 + " = '1' or " + kat2 + " = '2')";
                    pool.query( velicinaString + str, (err,result) => {
                        console.log(result.rows);
                        if(err){
                            console.log(err);
                        }else{
                            if(result.rows.length === 0){
                                res.render('rase/error',{footer:foot});
                            }
                            else{
                                req.raseSort = result.rows;
                                res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                            }
                        }
                    });
                }
                else{
                    let queryString = velicinaString + " and ";
                    for(let i =0; i < kat2.length-1; i++){
                        queryString += "("+ kat2[i] + " = '1' or " + kat2[i] + " = '2') and "
                    }
                    queryString+= "("+ kat2[kat2.length-1] + " = '1' or " + kat2[kat2.length-1] + " = '2')";
                    console.log(queryString);
                    pool.query(queryString,(err,result) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            if(result.rows.length === 0){
                                res.render('rase/error',{footer:foot});
                            }
                            else{
                                req.raseSort = result.rows;
                                res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                            }
                        }
                    })
                }
            }
            else{
                if(typeof kat === 'string' && typeof kat2 === 'string'){
                    let queryString = " and (" + kat2 + " = '1' or " + kat2 + " = '2') and ("+ kat + " = '3' or " + kat + " = '4' or " + kat + " ='5')";
                    pool.query(velicinaString + queryString, (err,result) => {
                        if(err){
                            console.log(err);
                        }else{
                            if(result.rows.length === 0){
                                res.render('rase/error',{footer:foot});
                            }
                            else{
                                req.raseSort = result.rows;
                                res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                            }
                        }
                    });
                }
                else if(typeof kat === 'string'){
                    let queryString = velicinaString + " and (" + kat + " = '3' or " + kat + " = '4' or " + kat + " ='5')";

                    for(let i =0; i < kat2.length; i++){
                        queryString += " and ("+ kat2[i] + " = '1' or " + kat2[i] + " = '2')"
                    }

                    pool.query(queryString, (err,result) => {
                        if(err){
                            console.log(err);
                        }else{
                            if(result.rows.length === 0){
                                res.render('rase/error',{footer:foot});
                            }
                            else{
                                req.raseSort = result.rows;
                                res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                            }
                        }
                    });

                }
                else if(typeof kat2 === 'string'){
                    let queryString = velicinaString + " and (" + kat2 + " = '1' or " + kat2 + " = '2')";
                    for(let i =0; i < kat.length; i++){
                        queryString += "and ("+ kat[i] + " = '3' or " + kat[i] + " = '4' or " + kat[i] + " ='5')"
                    }

                    pool.query(queryString, (err,result) => {
                        console.log(result.rows);
                        if(err){
                            console.log(err);
                        }else{
                            if(result.rows.length === 0){
                                res.render('rase/error',{footer:foot});
                            }
                            else{
                                req.raseSort = result.rows;
                                res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                            }
                        }
                    });
                }
                else{
                    let queryString = velicinaString + " and "
                    for(let i =0; i < kat2.length-1; i++){
                        queryString += "("+ kat2[i] + " = '1' or " + kat2[i] + " = '2') and "
                    }
                    queryString+= "("+ kat2[kat2.length-1] + " = '1' or " + kat2[kat2.length-1] + " = '2')";
                    for(let i =0; i < kat.length; i++){
                        queryString += "and ("+ kat[i] + " = '3' or " + kat[i] + " = '4' or " + kat[i] + " ='5')"
                    }
                    pool.query(queryString, (err,result) => {
                        console.log(result.rows);
                        if(err){
                            console.log(err);
                        }else{
                            if(result.rows.length === 0){
                                res.render('rase/error',{footer:foot});
                            }
                            else{
                                req.raseSort = result.rows;
                                res.render('rase/sveRase',{raseSort:req.raseSort,footer:foot});
                            }
                        }
                    });

                }
            }
        }

    }
});

module.exports = router;