const Connect = require("./db");
const mongo = require("mongodb");

const delTask = (id, res) => {
    const client = Connect();
    client.connect(err => {
        if(err) {
            throw new Error(err);
        }
        const db = client.db("heroku_1m7t9mw7");
        const col = db.collection("tasks");
        col.deleteOne({"_id": new mongo.ObjectId(id)}, err => {
            if(err) {
                throw new Error(err);
            }
            client.close();
            res.send({message: "ok"});
        });
    });
}

module.exports = delTask;