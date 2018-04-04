const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    txHash: {
        type: String,
        required: 'txHash is Required',
    },
    fromAddress: {
        type: String,
    },
    toAddress: {
        type: String
    },
    blockHeight: {
        type: Number
    },
    contractAddress: {
        type: String,
    },
    kittenId: {
        type: Number
    },
    status: {
        type: String
    },
    createdAt: {
        type: Number,
    },
    gasLimit: {
        type: Number
    },
    gasUsed: {
        type: Number
    },
    gasPrice: {
        type: Number
    },
    transactionIndex: {
        type: Number
    }
});

exports.Transaction = mongoose.model('transaction', transactionSchema);