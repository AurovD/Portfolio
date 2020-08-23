const express = require("express");
const router = express.Router();
const models = require("../models/bd");
const load = require("./img.js");
const paypal = require("paypal-rest-sdk");

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXknm_WgP2Mv_E7cPsiPut7GjyDsDeD5iX5PeABgGIMNmzlT9PHJhWv53W-RzGAtEE8neLWKteRwcnOk',
    'client_secret': 'EE3kTFF4AwLdldAIoZ37HOKa2xr8H5GuLC9ZzKhTy50YWHOCloEPs-MFsZpKJQrmurqEqNeoyOPKxmhp'
});

router.get("/product", async (req, res) => {
    const data = await models.Product.find();
    res.send({ "message": "ok", data: data });
});

router.get("/categories", async (req, res) => {
    let categories = {};
    const data = await models.Product.find();
    data.forEach(d => {
        if (d.count && !categories[d.category]) {
            categories[d.category] = true;
        }
    });
    let catArr = [];
    for (let k in categories) {
        catArr.push(k);
    }
    res.send({ "message": "ok", data: catArr });
});

router.post("/product/add/:id", load.single("img"), async (req, res, next) => {

    req.body.img = "/img/products/" + req.body.fileName;
    delete req.body.fileName;
    delete req.body.ext;
    req.body.parameters = JSON.parse(req.body.parameters);
    let product = new models.Product(req.body);
    await product.save();
    res.send({ "message": "ok" });
});

router.get("/categories/:category", async (req, res) => {
    const data = await models.Product.find({ "category": req.params.category });
    console.log("daa", data);
    res.send({ message: "ok", data: data });
});

router.get("/product/:id", async (req, res) => {
    const data = await models.Product.findOne({ "_id": req.params.id });
    res.send({ message: "ok", data: data });
});
router.post("/product/:id", load.single("productImg"), async (req, res, next) => {
    if(req.session.group === "Администратор") {
        await models.Product.updateOne({"_id": req.params.id}, {$push: {img: "/img/products/" + (req.body.fileName || "default.png")}});
    }
    const pro = await models.Product.findOne({ "_id": req.params.id });
    res.redirect("/categories/" + pro.category + "/" + req.params.id);
});

let upload = require("./addImg");
router.post("/fake", upload.single("file"), (req, res) => {
    res.send("hello");
});

router.post("/addUser", async (req, res) => {
    await new models.User(req.body).save();
    req.session.user = req.body.email;
    req.session.name = req.body.name;
    req.session.group = "Покупатель";
    // res.send({"message": "ok"});
    res.redirect("/user");
    res.end();
});

router.post("/user", async (req, res) => {
    let usr = await models.User.findOne({
        "email": req.body.email,
        "password": req.body.password
    });
    if (usr) {
        req.session.user = usr.email;
        req.session.name = usr.name;
        req.session.group = usr.group;
    }
    res.redirect("/");
    res.end();
});

router.post("/showBasket", (req, res) => {
    let arr = [];
    let length = req.body.length - 1;
    req.body.forEach(async (rec, i) => {
        let pro = await models.Product.findOne({ "_id": rec.id });
        if (pro) {
            arr.push(pro);
        }
        if (i === length) {
            res.send({ "message": "ok", "arr": arr });
        }
    });
});
router.post("/mainShowBasket", async (req, res) => {
    if (req.session.user) {
        let basket = await models.User.findOne({ "email": req.session.user });
        res.send({ "message": "ok", "bask": basket.basket});
    }
});
router.post("/product/:id/addReview", async (req, res) => {
    await models.Product.updateOne({ "_id": req.params.id }, { $push: { "reviews": req.body } });
    res.send({ "message": "ok" });
});
router.post("/user/updateBasket", async (req, res) => {
    if (req.session.user) {
        await models.User.updateOne({ "email": req.session.user }, {
            $set: { "basket": req.body }
        });
    }
    res.send({ "message": "ok" });
});
router.get("/user/getBasket", async (req, res) => {
    let arr = [];
    if (req.session.user) {
        data = await models.User.findOne({ "email": req.session.user });
        console.log(data.orders);
        // let orders = await JSON.parse(data.orders);
        for(let i = 0; i < data.orders.length; i++){
            let orders = await JSON.parse(data.orders[i]);
            for(let j = 0; j < orders.length; j++) {
                let list = await models.Product.findOne({ "_id": orders[j].id });
                if (list) {
                    arr.push(list);
                }
            }
        }
    }
    res.send({ "message": "ok", basket: data.basket, list: arr});
});

router.post("/user/order", async (req, res) => {
    if (req.session.user) {
        await models.User.updateOne({ "email": req.session.user }, {
            $push: {
                "address": req.body.address,
                "orders": req.body.orderbd
            },
            $set: {
                "basket": []
            }
        });
    }
    res.send({ "message": "ok"});
});
router.get("/getProducts", async (req, res) => {
    if (req.session.group === "Администратор") {
        let list = await models.Product.find();
        res.send({ "message": "ok", info: list });
    }
});
router.get("/users", async (req, res) => {
    if (req.session.group === "Администратор") {
        let data = await models.User.find({}).select("name tel email group orders address _id");
        res.send({ "message": "ok", info: data });
    } else {
        res.send({ "message": "not admin" });
    }
});
router.get("/userOrders", async (req, res) => {
    console.log("user", req.session.user);
    let arr = [];
    if (req.session.user) {
        let data = await models.User.findOne({"email": req.session.user });
        console.log("data", data);
        res.send({ "message": "ok", data: data});
    }
});
module.exports = router;


