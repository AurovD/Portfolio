const addU = require("../model/addUser");
const getU = require("../model/getUser");
const showU = require("../model/userList");

const reg = (req,res, next) => {
    addU(req.body, res);
};
const log = (req,res, next) => {
    getU(req.body, res);
};

const show = (req, res) => {
    showU(res);
};


module.exports = {reg, log, show};