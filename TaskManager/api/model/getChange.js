const Connect = require("./db");
const mongo = require("mongodb");
const getChange = (data,res) => {
    const client = Connect();
    client.connect(err => {
        if(err) {
            throw new Error(err);
        }
        const db = client.db("heroku_1m7t9mw7");
        const col = db.collection("tasks");
        col.updateOne({
            _id: new mongo.ObjectId(data.id)
        }, {
            $set: {
                "status": data.status
            }
        }, err => {
                if(err) {
                    throw new Error(err);
                }
                res.send({message: "ok"});
        });
    });
}

module.exports = getChange