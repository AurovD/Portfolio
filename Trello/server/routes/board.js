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
router.post("/createBoard", parser, (req,res) => {
    let users = req.body.users.split(", ");
    pool.query(`CREATE TABLE IF NOT EXISTS boards_dima (id SERIAL PRIMARY KEY, name VARCHAR(255), users VARCHAR(30)[]);`, (err, resp) => {
        if(err) {
            console.log("err", err);
        }
    });
    pool.query(`CREATE TABLE IF NOT EXISTS userboards_dima (id SERIAL PRIMARY KEY, id_users INT, id_boards INT);`, (err, resp) => {
        if(err) {
            console.log("err", err);
        }
    });
    // pool.query(`SELECT * FROM users_dima WHERE login = $1 AND pwd = $2`,[req.body.login], (err, respond) => {
    // pool.query(`UPDATE users_dima SET board = array_append(board,$1) WHERE login = $2`, [req.body.name, req.body.login], (err, respond) => {
    pool.query(`INSERT INTO boards_dima (name, users) VALUES ($1, ARRAY[$2]) RETURNING id;`, [req.body.name, req.body.id],(error, response) => {
        if(error) {
            console.log(error, "board");
        }
        if(response) {
            pool.query(`INSERT INTO userboards_dima (id_users, id_boards) VALUES ($2, (SELECT id FROM boards_dima WHERE name = $1));`, [req.body.name, req.body.id],(error, response) => {
                if(error) {
                    console.log(error);
                }
                res.send({
                    "msg": "ok"
                });
            });
            users.map(user => {
                pool.query(`SELECT id FROM users_dima WHERE login = $1;`, [user], (err, respond) => {
                    console.log(user, "board");
                    if(error) {
                        console.log(error);
                    }
                    if(respond.rows.length > 0) {
                        pool.query(`UPDATE boards_dima SET users = array_append(users, $1) WHERE name = $2;`, [respond.rows[0].id, req.body.name], (err, resp) => {
                            if(error) {
                                console.log(error);
                            }
                            if(resp) {
                                pool.query(`INSERT INTO userboards_dima (id_users, id_boards) VALUES ($1, (SELECT id FROM boards_dima WHERE name = $2));`, [respond.rows[0].id, req.body.name],(error, response) => {
                                    if(error) {
                                        console.log(error);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    })
});
router.post("/getBoard", parser, (req,res) => {
    pool.query(`SELECT userboards_dima.id_boards, boards_dima.name, boards_dima.users FROM userboards_dima INNER JOIN  boards_dima ON userboards_dima.id_boards = boards_dima.id WHERE userboards_dima.id_users = $1`, [req.body.id], (err, respond) => {
        if(err) {
            console.log(err);
        }
        if(respond) {
            res.send({
                "data": respond.rows
            });
        }
    })
});
module.exports = router;