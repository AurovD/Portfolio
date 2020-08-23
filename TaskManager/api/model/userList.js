const Connect = require("./db");

function getUList(res) {
    const client = Connect();
    client.connect(err => {
        if(err) {
            throw new Error(err);
        }
        const db = client.db("heroku_1m7t9mw7");
        const collection = db.collection("users");
        collection.find({}).toArray((err, items) => {
            if(items.length) {
                client.close();
                res.send({
                    message: "ok",
                    data: items
                })
            } else {
                client.close();
                res.send({message: "No users"})
            }
        })
    })
}
module.exports = getUList;