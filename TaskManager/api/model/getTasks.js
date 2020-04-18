const Connect = require("./db");

const addTasks = (res) => {
    const client = Connect();
    client.connect(err => {
        if(err) {
            throw new Error(err);
        }
        const db = client.db("heroku_1m7t9mw7");
        const col = db.collection("tasks");
        col.find({}).toArray((err, items) => {
            if(err) {
                throw new Error(err);
            }
            res.send({"records": items});
        });
    });
};
module.exports = addTasks;