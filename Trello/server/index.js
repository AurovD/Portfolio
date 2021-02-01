const express = require("express");
const path = require('path');
const port = process.env.PORT || 8001;
const app = express();

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin,*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',
        '*');
    if (req.method === 'OPTIONS') {
        res.status(200);
    } next(); })
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.set("views", "./public");
app.set("view engine", "html");
app.use("/api/users", require("./routes/user"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/boards", require("./routes/board"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/signup.html'));
});

app.listen(port);
