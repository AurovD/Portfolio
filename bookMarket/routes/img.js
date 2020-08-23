const multer = require("multer");
const fs = require("fs");
const path = require('path');
const directoryPath = path.join(__dirname, '../public/img/products/');
let arrFiles = [];
let count = 0;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img/products")
    },
    filename: (req, file, cb) => {
        let fileList = fs.readdirSync(directoryPath);
        let ext = file.originalname.split(".");
        ext = ext[ext.length - 1];
        req.body.ext = ext;
        if (!req.params.id) {
            fileList.forEach(img => {
                console.log("676");
                if(img.includes(req.body.id) && img.indexOf(req.body.id) === 0) {
                    count++;
                }
            });
            req.body.fileName = req.body.id + "." + ext;
        } else {
            fileList.forEach(img => {
                if(img.includes(req.params.id) && img.indexOf(req.params.id) === 0) {
                    console.log(count);
                    count++;
                }
            });
            req.body.fileName = req.params.id + "." + ext;
        }
        // fileList.forEach(img => {
        //     if(fileList.indexOf(req.body.fileName) >= 0) {
        //         count = 0;
        //         count++;
        //         req.body.fileName = req.params.id + count + "." + ext;
        //         cb(null, req.params.id + count + "." + ext);
        //         console.log("khkh", req.body.fileName);
        //     } else {
        //         console.log("kjl");
        if(count === 0){
            console.log("first");
            req.body.fileName = req.params.id + "." + ext;
            cb(null, req.params.id + "." + ext);
        } else {
            console.log("second", count);
            count++;
            req.body.fileName = req.params.id +"_"+ count + "." + ext;
            cb(null, req.params.id + "_"+ count +"." + ext);
            count = 0;
        }
        // });
    }
});

const load = multer({ storage: storage });

module.exports = load;