const async = require('asyncawait/async');
const await = require('asyncawait/await');
const { Transaction } = require('../models/transaction');
const Redis = require('../services/redis');
const Config = require('../configs/config');

exports.createTransaction = async(function (req, res, next) {
    const { txHash, gasLimit, gasPrice, fromAddress, toAddress, kittenId } = req.body;
    // console.log("this is", txHash, "transactionHash from input")
    const createdAt = Date.now();
    const transaction = new Transaction({
        txHash,
        gasLimit,
        gasPrice,
        fromAddress,
        toAddress,
        kittenId,
        contractAddress: Config.CONTRACT_ADDRESS
    });
    await(transaction.save());
    await(Redis.addToSet(Config.QUEUE_NAME, txHash));
    res.json({
        message: 'transaction saved!'
    });
});

exports.getOutgoingTransactions = async(function(req, res, next) {
    const { address } = req.query;
    const transactions = await(Transaction.find({ fromAddress: address }));
    res.json({ transactions });
});

exports.getIncomingTransactions = async(function(req, res, next) {
    const { address } = req.query;
    const transactions = await(Transaction.find({ toAddress: address }));
    res.json({ transactions });
});