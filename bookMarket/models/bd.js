const mongoose = require("mongoose");
mongoose.connect("mongodb://Dima:qwerty123@ds235827.mlab.com:35827/heroku_x28dhpmx", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const ProductSchema = new mongoose.Schema({
    title: String,
    price: Number,
    // img: {type: String},
    img: [String],
    discription: {type: String, default: "О чем-о"},
    rating: Number,
    parameters: {
        pages: Number,
        author: String,
    },
    category: {type: String, default: "Без категории"},
    releaseDate: {type: Date, default: Date.now()},
    count: {type: Number, default: 0},
    reviews: [{
        rating: {type: Number, default: 0},
        name: {type: String, default: "Тайный покупатель"},
        text: String
    }],
    series: {type: String, default: "Не входит в какую-либо серию"},
    tags: [String],
    _id: String,
    barcode: String
    // еще один ключ в бд images [ пути ] + кнопка купить 49 минута
});
const  Product = mongoose.model("Book", ProductSchema);

const UserSchema = new mongoose.Schema({
    group: {type: String, default: "Покупатель"},
    name: String,
    email: String,
    tel: String,
    password: String,
    address: [String],
    orders: [],
    basket: []
});

const User = mongoose.model("market_users", UserSchema);

const orderSchema = mongoose.Schema({
    productID: String,
    time: Date
});

const Order = mongoose.model("market_orders", ProductSchema);

module.exports = {Product, User, Order};