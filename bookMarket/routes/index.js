const express = require("express");
const router = express.Router();
const load = require("./img.js");
router.get("/", (req, res) => {
    res.render("index", {
        user: req.session
    });
})
router.get("/addProduct", (req, res) => {
    if(req.session.group === "Администратор") {
        res.render("addProduct");
    } else {
        res.status(404).render("error", {
            status: 404
        });
    }
});
router.get("/categories/:category", (req, res) => {
   res.render("category", {
       name: req.params.category
   });
});
router.get("/categories/:category/:product", (req, res) => {
    const flag = !!(req.session.group === "Администратор");
    res.render("product", {
       name: req.params.product,
       user: req.session.name,
       stars: 5,
       access: flag
    });
});

router.post("/editImg/:id", load.single("productImg"), (req, res, next) => {
   res.send("/categories/:category/" + req.params.id + "/" + req.body.ext);
});

router.get("/fake", (req, res) => {
    res.render("fake");
});

router.get("/user", (req, res) => {
    console.log(req.session);
    if(req.session.user) {
        res.render("profile", {
            user: req.session
        });
    } else {
        res.render("login");
    }
});

router.get("/logout", (req, res) => {
   req.session.destroy();
   res.redirect("/");
});

router.get("/basket", (req, res) => {
    res.render("cart");
});
module.exports = router;