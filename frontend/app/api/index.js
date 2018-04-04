const { API_URL } = require('../config');
const axios = require('axios');
const Promise = require('bluebird');

exports.tokensOfOwner = (ownerAddress) => {
    const url = `https://api.cryptokitties.co/kitties?offset=0&limit=100&owner_wallet_address=${ownerAddress}&parents=false&authenticated=true&orderBy=id&orderDirection=desc`;
    return axios.get(url, {}).then((response) => Promise.resolve(response.data.kitties));
}

exports.getOutgoingTransactions = (address) => {
    const url = `${API_URL}/getOutgoingTransactions`;
    const authedAxios = axios.create({
        headers: { 'Access-Control-Allow-Origin': '*', withCredentials: true },
    });
    return authedAxios.get(url, { params: { address }}).then((response) => Promise.resolve(response.data.transactions));
}

exports.getIncomingTransactions = (address) => {
    const url = `${API_URL}/getIncomingTransactions`;
    const authedAxios = axios.create({
        headers: { 'Access-Control-Allow-Origin': '*', withCredentials: true },
    });
    return authedAxios.get(url, { params: { address }}).then((response) => Promise.resolve(response.data.transactions));
}

exports.createTransaction = (txHash, gasLimit, gasPrice, fromAddress, toAddress, kittenId) => {
    const url = `${API_URL}/createTransaction`;
    const authedAxios = axios.create({
        headers: { 'Access-Control-Allow-Origin': '*', withCredentials: true },
    });
    return authedAxios.post(url, { txHash, gasLimit, gasPrice, fromAddress, toAddress, kittenId })
    .then((response) => Promise.resolve(response.data.message))
    .catch((err) => console.log(err))
}