const mongoose = require('mongoose');
const { Transaction } = require('../models/transaction');
const Promise = require('bluebird');
const Config = require('../configs/config');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.MONGO_URL);
}
else if (process.env.NODE_ENV === "seed-production") {
    mongoose.connect(Config.MONGO_URL);
}
else {
    mongoose.connect('mongodb://localhost/myCryptoKitties');
}

mongoose.connection.once('connected', () => {
    mongoose.connection.db.collection("transactions").createIndex({ txHash: 1 }, { background: true });
    mongoose.connection.db.collection("transactions").createIndex({ fromAddress: 1 }, { background: true });
    mongoose.connection.db.collection("transactions").createIndex({ toAddress: 1 }, { background: true });
});

const transaction = new Transaction;
transaction.save(function (err) {

});