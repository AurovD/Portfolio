const express = require("express");
const router = express.Router();
const  parser = require("body-parser").json();
// const pool= require("./dbconfig");
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'student',
    host: '188.225.78.173',
    database: 'ithub_pg',
    password: 'ithub2020',
    port: 5432,
});


router.post("/create", parser, (req,res) => {
    pool.query(`CREATE TABLE IF NOT EXISTS users_dima (id SERIAL PRIMARY KEY, name VARCHAR(255), login VARCHAR(15), pwd VARCHAR(30), board VARCHAR(30)[], tasks INT []);`, (err, resp) => {
    // pool.query(`CREATE TABLE IF NOT EXISTS users_dima (id SERIAL PRIMARY KEY, name VARCHAR(255), login VARCHAR(15), pwd VARCHAR(30));`, (err, resp) => {
        if(err) {
            console.log("err", err);
        } else {
            console.log("oki");
        }
    });
    pool.query(`INSERT INTO users_dima (name, login, pwd) VALUES ($1, $2, $3) RETURNING id;`, [req.body.name, req.body.login, req.body.password],(error, response) => {
        if(error) {
            console.log(error);
        }
        if(response) {
            console.log("done");
            res.send({
                "msg": "ok"
            });
        }
    });
});

router.post("/auth", parser, (req,res) => {
    console.log(req.body)
    // pool.query(`SELECT * FROM users_dima WHERE login = $1 AND pwd = $2`,[req.body.login], (err, respond) => {
        pool.query(`SELECT * FROM users_dima WHERE login = $1 AND pwd = $2`, [req.body.login, req.body.password], (err, respond) => {
            if(respond) {
                res.send({
                    "data": respond.rows[0]
                });
            }
    })
});
router.post("/getUsers", parser, (req,res) => {
    let users = [];
    if(req.body.id.length > 0) {
        pool.query(`SELECT id, name FROM users_dima`, (err, respond) => {
                if(respond) {
                    for(let i = 0; i < req.body.id.length; i++){
                        for(let j = 0; j < respond.rows.length; j++){
                            if(req.body.id[i] == respond.rows[j].id){
                                users.push(respond.rows[j].name)
                            }
                        }
                    }
                    res.send({
                        "data": users
                    })
                }
        });
    }
});
router.post("/changes", parser, (req,res) => {
    console.log(req.body)
    pool.query(`UPDATE users_dima SET name = $1, login = $2 WHERE id = $3`, [req.body.name, req.body.login, req.body.id], (err, respond) => {
        if(respond) {
            pool.query(`SELECT * FROM users_dima WHERE id = $1`, [req.body.id], (err, respond) => {
                if(respond) {
                    console.log(respond.rows, "answer");
                    res.send({
                        "data": respond.rows[0]
                    });
                }
            });
        }
    });
    if(req.body.password !== "") {
        pool.query(`UPDATE users_dima SET pwd = $1  WHERE id = $2`, [req.body.password, req.body.id], (err, respond) => {
        });
    }
});



module.exports = router;