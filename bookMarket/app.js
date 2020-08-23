const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const FileStore = require("session-file-store")(session);
const stylus = require("stylus");

let sessionConfig = {
    secret: "Jojo",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new FileStore({})
};


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session(sessionConfig));
app.use(cookieParser());
app.use(stylus.middleware({
    src: __dirname + "/public",
    compile: (str, path) => {
        return stylus(str).set("filename", path);
    }
}));

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.store || 500);
    res.render("error", {
        status: error.status
    });
});


module.exports = app;