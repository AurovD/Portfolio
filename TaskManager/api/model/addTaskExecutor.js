const Connect = require("./db");
const mongo = require("mongodb");

const addExector = (data, res) => {
    const client = Connect();
    client.connect(err => {
        if(err) {
            throw new Error(err);
        }
        const db = client.db("heroku_1m7t9mw7");
        const col = db.collection("tasks");
        col.insertOne({_id: new mongo.ObjectId(data.id)}, {
            $set: {
                executor: data.params.executor
            }
        }, err => {
            if(err) {
                throw  new Error();
            }
            col.find({}).toArray((err, items) => {
                if(err) {
                    throw new Error(err);
                }
                client.close();
                res.send({"records": items});
            });
        });
    });
}

module.exports = addExector();