const express = require("express");
const stylus = require("stylus");

const port = 9050;

const app = express();

app.set("views", "./server/views");
app.set("view engine", "pug");

app.use(express.static("./public"));
app.use(stylus.middleware({
    src: "./public",
    compile: (str, path) => {
        return stylus(str).set("filename", path);
    }
}));

app.get("/", (req, res) => {
    res.render("layout");
});
app.listen(port, () => {
    console.log("Server gonna work");
});