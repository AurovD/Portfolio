const Connect = require("./db");

const getUser = (data, res) => {
    const client = Connect();
    client.connect(err => {
        if(err) {
            throw new Error(err);
        }
        const db = client.db("heroku_1m7t9mw7");
        const collection = db.collection("users");
        collection.findOne({
            login: data.login,
            password: data.password
        }, (err, record) => {
            if(err) {
                throw new Error()
            }
            if(record) {
                client.close();
                    res.send({
                        message: "ok",
                        group: record.group
                    })
            } else {
                client.close();
                res.send({message: "Wrong passsword or login"})
            }
        });
    });
};


module.exports = getUser;