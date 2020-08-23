const exp = require("express");
let router = exp.Router();

const uCtrl = require("../controllers/userControl");
const tCtrl = require("../controllers/taskControl");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/signUp", uCtrl.userReg);
router.get("/profile/:group/:login", uCtrl.userProf);
router.get("/logIn", uCtrl.userIn);
router.get("/logOut", uCtrl.userOut);
router.get("/tasks", tCtrl.show);
router.get("/tasks/create", tCtrl.add);

module.exports = router;