import Web3 from 'web3'
import { abi, address } from './contractAbi'
import Promise from 'bluebird'

const testnet = `https://rinkeby.infura.io/mr4ZDQGheVQ3kBytCi76${process.env.INFURA_ACCESS_TOKEN}`;

let getContract = new Promise((resolve, reject) => {
  try {
    const provider = new Web3.providers.HttpProvider(testnet);

    const web3 = new Web3(provider);

    web3.eth.accounts.privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);

    web3.eth.defaultAccount = process.env.WALLET_ADDRESS;

    let contract = new web3.eth.Contract(abi);
    contract.options.address = address;

    resolve({contract, web3});
  } catch(err) {
    reject(err);
  }
})

export default getContract
