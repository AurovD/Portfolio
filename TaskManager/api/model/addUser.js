let Connect = require("./db");

function addUser(data, res) {
    let record = {...data};
    const client = Connect();
    client.connect(err => {
        if(err) {
            throw new Error(err);
        }
        const db = client.db("heroku_1m7t9mw7");
        const collection = db.collection("users");
        // TODO: Добавлять запись только если такого логина и почты не сузествует
        collection.insertOne(record, err => {
            if(err) {
                throw new Error(err);
            }
            client.close();
            res.send({message: "ok", group: data.group});
        });
    });
}


module.exports = addUser;