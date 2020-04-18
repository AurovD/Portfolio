const userReg = (req,res) => {
    res.render("reg");
};

const userIn = (req, res) => {
    res.render("auth");
};

const userOut = (req,res) => {
    req.session.destroy();
    res.cookie("user", "", {maxAge: -1, httpOnly: true})
    res.redirect("/");
};

const userProf = (req,res) => {
    req.session.user= req.params.login;
    req.session.group = req.params.group;
    res.cookie("user", req.params.login, {maxAge: 1000 * 60 * 60 * 24, httpOnly: false});
    res.render("profile", {
        user: req.params.login
    });
};

module.exports = {userReg, userIn, userOut, userProf};