const exp = require("express");
const router = exp.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const uCtrl = require("../controllers/userControlApi");
const tCtrl = require("../controllers/taskControlApi");

router.post("/signUp", jsonParser,uCtrl.reg);

router.post("/logIn", jsonParser, uCtrl.log);
router.get("/getUserList", uCtrl.show);


router.post("/tasks/create", jsonParser, tCtrl.add);

router.get("/tasks/show", tCtrl.show);

router.put("/tasks/change", jsonParser, tCtrl.change);

router.delete("/tasks/delete/:id", jsonParser, tCtrl.del);

module.exports = router;