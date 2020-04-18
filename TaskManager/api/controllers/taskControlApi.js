const addT = require("../model/addTask");
const getT = require("../model/getTasks");
const getC = require("../model/getChange");
const delT = require("../model/delTask");

const show = (req,res) => {
    getT(res);
};
const add = (req,res, next) => {
    console.log(req.body);
    if(req.body.executor === "true") {
        req.body.executor = req.session.user;
    }
    addT(req.body, res);
};

const change = (req,res, next) => {
    getC(req.body, res);
    // res.send({message: "ok"})
};

const del = (req, res) => {
    delT(req.params.id, res)
};

module.exports = {show, add, change, del};