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

router.post("/addTask", parser, (req,res) => {
    let users = req.body.users.split(", ");
    let tags = req.body.tags.split(", ");
    pool.query(`CREATE TABLE IF NOT EXISTS tasks_dima (id SERIAL PRIMARY KEY, name VARCHAR(255), plot VARCHAR(255), date VARCHAR(255), status VARCHAR(255), tags VARCHAR(255)[], users VARCHAR(255) []);`, (err, resp) => {
        if(err) {
            console.log("err", err);
        }
    });
    pool.query(`CREATE TABLE IF NOT EXISTS tasksboards_dima (id SERIAL PRIMARY KEY, id_boards INT, id_task INT);`, (err, resp) => {
        if(err) {
            console.log("err", err);
        }
    });
    pool.query(`INSERT INTO tasks_dima (name, plot, date, status, users) VALUES ($1, $2, $3, $5, ARRAY[$4]) RETURNING id;`, [req.body.name, req.body.plot, req.body.date, req.body.idUser, req.body.status],(error, response) => {
    // pool.query(`INSERT INTO tasks_dima (name, plot, date, tags, users) VALUES ($1, $2, $3, $4, $5) RETURNING id;`, [req.body.name, req.body.plot, req.body.date, tags, users],(error, response) => {
        if(error) {
            console.log(error);
        }
        if(response) {
            res.send({
                "msg": "ok"
            });
            users.map(user => {
                pool.query(`SELECT id FROM users_dima WHERE login = $1;`, [user], (err, respond) => {
                    if(error) {
                        console.log(error);
                    }
                    if(respond.rows.length > 0) {
                        pool.query(`UPDATE tasks_dima SET users = array_append(users, $1) WHERE name = $2;`, [respond.rows[0].id, req.body.name], (err, resp) => {
                            if(error) {
                                console.log(error);
                            }
                        });
                    }
                });
            });
            tags.map(tag => {
                pool.query(`UPDATE tasks_dima SET tags = array_append(tags, $1) WHERE name = $2`, [tag, req.body.name], (err, respond) => {
                    if(error) {
                        console.log(error);
                    }
                });
            });
            pool.query(`INSERT INTO tasksboards_dima (id_boards, id_task) VALUES ($2, (SELECT id FROM tasks_dima WHERE name = $1));`, [req.body.name, req.body.idBoard],(error, response) => {
                if(error) {
                    console.log(error);
                }
            });
        }
    });
});

router.post("/getTask", parser, (req,res) => {
    pool.query(`SELECT tasks_dima.* FROM tasksboards_dima INNER JOIN  tasks_dima ON tasksboards_dima.id_task = tasks_dima.id WHERE tasksboards_dima.id_boards = $1`, [req.body.id], (err, respond) => {
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
router.post("/status", parser, (req,res) => {
    console.log(req.body)
    pool.query(`UPDATE tasks_dima SET status = $2 WHERE id = $1`, [req.body.id, req.body.status], (err, respond) => {
        if(respond) {
            res.send({
                "msg": "ok"
            });
        }
    })
});

module.exports = router;