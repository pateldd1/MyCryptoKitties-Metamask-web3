// I can't figure out webSocketProvider. I'm just going to use polling.


const Web3 = require('web3');
const abi = require('../abi/kittyABI');
// var provider = new Web3.providers.currentProvider;
const provider = new Web3.providers.WebsocketProvider('ws://alpha1.token.store:8555')
let web3 = new Web3(provider);
// console.log(web3.providers)
// const Accounts = require('web3-eth-accounts');
// let accounts = new Accounts('http://localhost:8545');
// console.log(web3.eth.defaultAccount)
// const async = require('asyncawait/async');
// const await = require('asyncawait/await');
const MyContract = new web3.eth.Contract(abi, "0x06012c8cf97bead5deae237070f9587f8e7a266d");
// MyContract.events.Transfer(null, (err, res) => console.log(res))

const transferEvent = MyContract.events
    .Transfer({
        filter: {
                    from: "0x5390bc0dab17110b3b21fee8c06d0f2005a828db", 
                    to: "0xa07be9d472cfde7b0e07451963059ddd6945b4f3", 
                    tokenId: 585150 
                }, fromBlock: 0 },
        (err, res) => console.log(res))
    .on("data", (event) => console.log(event))
    .on("change", (event) => console.log(event))
    .on("error", console.error);

    // console.log(transferEvent)
// console.log(MyContract.once("Transfer", { filter: {
//                     from: "0x5390bc0dab17110b3b21fee8c06d0f2005a828db", 
//                     to: "0xa07be9d472cfde7b0e07451963059ddd6945b4f3", 
//                     tokenId: 585150 
//                 }, fromBlock: 0 }, (err, res) => console.log(res)));
    // .Transfer(null,
    //     (err, res) => console.log(res))
    // .on("data", (event) => console.log(event))
    // .on("change", (event) => console.log(event))
    // .on("error", console.error);
// const bal = ContractInstance.balanceOf("0x081b834147d44b0740b668942cd28ae2963f3b1d");
// const tokens = ContractInstance.kittyIndexToOwner();
// console.log(bal.toNumber())
// console.log(Web3)


// const Web3 = require("web3");
// const net = require("net");

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Set with the address youhave your Rinkeby node running:
// const provider = process.env.FULL_NODE_URL || "http://localhost:8945";

// const abi = require("../ABI/KittyCore.json");
// const salesAbi = require("../ABI/SaleClockAuction.json");

// const coreBountyAddress = "0x16baf0de678e52367adc69fd067e5edd1d33e3bf";
// const salesBountyAddress = "0x8a316edee51b65e1627c801dbc09aa413c8f97c2";

// const web3 = new Web3();

// require a local full node to be running
// web3.setProvider(new web3.providers.HttpProvider(provider));

// const CoreContract = web3.eth.contract(abi);
// const instance = CoreContract.at("0x06012c8cf97bead5deae237070f9587f8e7a266d");

// const SalesContract = web3.eth.contract(salesAbi);
// const salesInstance = SalesContract.at(salesBountyAddress);

// const callAsync = async(function (method, ...args) {
//     return new Promise(function (resolve, reject) {
//         instance[method](...args, (err, res) => {
//             if (err) reject(err);
//             else resolve(res);
//         });
//     });
// })

// async function callAsyncSales(method, ...args) {
//   return new Promise(function (resolve, reject) {
//     salesInstance[method](...args, (err, res) => {
//       if (err) reject(err);
//       else resolve(res);
//     });
//   });
// }

// helper
// const getKitty = async(function (id) {
//     const attrs = await(callAsync("getKitty", id));
//     return {
//         isGestating: attrs[0],
//         isReady: attrs[1],
//         cooldownIndex: attrs[2].toNumber(),
//         nextActionAt: attrs[3].toNumber(),
//         siringWithId: attrs[4].toNumber(),
//         birthTime: attrs[5].toNumber(),
//         matronId: attrs[6].toNumber(),
//         sireId: attrs[7].toNumber(),
//         generation: attrs[8].toNumber(),
//         genes: attrs[9].toString()
//     };
// });

// async function getAuction(id) {
//   const [
//     seller,
//     startingPrice,
//     endingPrice,
//     duration,
//     startedAt
//   ] = await callAsyncSales("getAuction", id);
//   return {
//     seller,
//     startingPrice: startingPrice.toString(),
//     endingPrice: endingPrice.toString(),
//     duration: duration.toString(),
//     startedAt: startedAt.toString()
//   };
// }

// const run = async(function () {
//     let n;
//     try {
//         n = await(callAsync("totalSupply"));
//     } catch (err) {
//         console.log(
//             "\nMake sure your testrpc is running --rinkeby at",
//             provider,
//             "\n"
//         );
//         console.log(err);
//         process.exit(1);
//     }
//     console.log("kittens:", n.toNumber());

//     for (let i = 1; i <= n; i++) {
//         const kitty = await(getKitty(i));
//         const owner = await(callAsync("kittyIndexToOwner", i));
//         // const auction = await getAuction(i);
//         if (owner === "0x081b834147d44b0740b668942cd28ae2963f3b1d") {
//             console.log("kitty", i, owner, kitty);
//         }
//         // console.log("\n  auction:", auction);
//         // console.log("----------------------------------------");
//     }

//     process.exit(0);
// });

// const id = web3.eth.getAccounts((err, accounts) => {
//     console.log(accounts)
// })

// console.log(web3.eth.getBalance('0x5390bc0dAb17110b3b21FEe8C06D0f2005A828db').toNumber());

// console.log(web3.fromWei(id.toNumber(), "ether"))
// run().catch(console.error);



// let getWeb3 = new Promise(function(resolve, reject) {
//   // Wait for loading completion to avoid race conditions with web3 injection timing.
//   window.addEventListener('load', function() {
//     var results
//     var web3 = window.web3
//     console.log(web3);
//     // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//     if (typeof web3 !== 'undefined') {
//       // Use Mist/MetaMask's provider.
//       web3 = new Web3(web3.currentProvider)

//       results = {
//         web3: web3
//       }

//       console.log('Injected web3 detected.');

//       resolve(results)
//     } else {
//       // Fallback to localhost if no web3 injection. We've configured this to
//       // use the development console's port by default.
//       var provider = new Web3.providers.HttpProvider('http://alpha1.token.store:8555')

//       web3 = new Web3(provider)

//       results = {
//         web3: web3
//       }

//       console.log('No web3 instance injected, using Local web3.');
//       console.log(results);

//       resolve(results)
//     }
//   })
// })



// export default getWeb3
