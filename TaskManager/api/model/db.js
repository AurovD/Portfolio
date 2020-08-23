function dbConnect() {
    const MongoClient = require("mongodb").MongoClient;
    const userName = "Dima";
    const userPass = "qwerty12345";
    const dbURI = `mongodb://${userName}:${userPass}@ds359298.mlab.com:59298/heroku_1m7t9mw7`;

    return MongoClient(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = dbConnect;