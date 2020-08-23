const mul = require("multer");

const storage = mul.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img/fake");
    },
    filename: function (req, file, cb) {
        let date = new Date();
        console.log("date", date);
        cb(null, date.getTime() + ".png");
    }
});

const upload = mul({storage: storage});
module.exports = upload;