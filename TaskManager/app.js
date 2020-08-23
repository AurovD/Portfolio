const http = require('http');
const stylus = require("stylus");
const path = require("path");
const express = require(`express`);
const port = process.env.PORT || 3000;
const app = express();
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");

let sConfig = {
    secret: "ololo",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new FileStore({})
}
app.set("views", "./server/views");
app.set("view engine", "pug");

app.use(stylus.middleware({
    src:'./public',
    compile: function(str, path) {
        return stylus(str).set('filename', path);
    }
}));
app.use(session(sConfig));
app.use(cookieParser());


app.use(express.urlencoded({extended: true, limit: "3mb"}));
app.use(express.static("./public"));
const serverRouter = require("./Server/routes/index.js");
const apiRouter = require("./api/routes/index.js");
app.use("/", serverRouter);
app.use("/api", apiRouter);

const server = http.createServer(app);
server.listen(port);

//mvc - module - view - controller

// const http = require('http');
// const stylus = require("stylus");
// const path = require("path");
// const express = require(`express`);
// const port = process.env.PORT || 3000;
// const app = express();
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
// const cookieParser = require("cookie-parser");
//
// let sConfig = {
//     secret: "ololo",
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new FileStore({})
// }
// app.set("views", "./server/views");
// app.set("view engine", "pug");
//
// app.use(stylus.middleware({
//     src:'./public',
//     compile: function(str, path) {
//         return stylus(str).set('filename', path);
//     }
// }));
// app.use(session(sConfig));
// app.use(cookieParser());
//
//
// app.use(express.urlencoded({extended: true, limit: "3mb"}));
// app.use(express.static("./public"));
// const serverRouter = require("./Server/routes/index.js");
// const apiRouter = require("./api/routes/index.js");
// app.use("/", serverRouter);
// app.use("/api", apiRouter);
//
// const server = http.createServer(app);
// server.listen(port);