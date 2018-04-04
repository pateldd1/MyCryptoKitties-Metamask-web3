const Web3 = require('web3');
const abi = require('../../frontend/abi/kittyABI');
const Config = require('../configs/config');
const Redis = require('./redis');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const { Transaction } = require('../models/transaction');
const provider = new Web3.providers.HttpProvider('http://alpha1.token.store:8555')
let web3 = new Web3(provider);

setInterval(async(function(){
    const set = await(Redis.getSet(Config.QUEUE_NAME));
    console.log(set)
    Object.keys(set).forEach((txHash) => {
        let statusUpdate, blockHeight, gasUsed, transactionIndex;
        web3.eth.getTransactionReceipt(txHash, async(function(err, result) {
            console.log(result);
            if (result) {
                if (result.status === '0x1') {
                    statusUpdate = 'SUCCESS';
                }
                else {
                    statusUpdate = 'FAIL';
                }
                gasUsed = result.gasUsed;
                blockHeight = result.blockNumber;
                transactionIndex = result.transactionIndex;
                await(Redis.removeFromSet(Config.QUEUE_NAME, txHash));
            }
            else {
                statusUpdate = 'PENDING';
            }
            await(Transaction.findOneAndUpdate({ txHash }, { status: statusUpdate, gasUsed, blockHeight, transactionIndex }));
        }));
    });
}), 5000);