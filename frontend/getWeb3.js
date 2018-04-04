const Web3 = require('web3');
// const Promise = require('bluebird');
// var provider = new Web3.providers.currentProvider;

const getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    let results
    let web3 = window.web3;
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3: web3
      }
      console.log('Injected web3 detected.');

      return resolve(results)
    } 
    else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
        const provider = new Web3.providers.HttpProvider('http://localhost:8545')

      web3 = new Web3(provider)

      results = {
        web3: web3
      }

      console.log('No web3 instance injected, using Local web3.');
      console.log(results);

      return resolve(results)
    }
  })
})
// getWeb3.then((res) => console.log(res))


export default getWeb3;