const show = (req,res) => {
    res.render("tasks");
};
const add = (req,res) => {
    res.render("createTask");
};

module.exports = {show, add};