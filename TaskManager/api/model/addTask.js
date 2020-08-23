const Connect = require("./db");


const addTask = (data,res) => {
    const client = Connect();
    client.connect(err => {
    if(err) {
        throw new Error(err);
    }
    const db = client.db("heroku_1m7t9mw7");
    const col = db.collection("tasks");
    col.insertOne(data, err => {
        if(err) {
            throw new Error(err);
        }
        client.close();
        res.send({message: "ok"});
    });
});
}

module.exports = addTask;