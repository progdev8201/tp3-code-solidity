const pickUpLineAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "line",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct PickUpLiner.PickUpLine",
        "name": "pickUpLine",
        "type": "tuple"
      }
    ],
    "name": "PickUpLineAdded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "makeDonationToOwner",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "line",
            "type": "string"
          }
        ],
        "internalType": "struct PickUpLiner.PickUpLine",
        "name": "_pickUpLine",
        "type": "tuple"
      }
    ],
    "name": "addPickUpLine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pickUpLineId",
        "type": "uint256"
      }
    ],
    "name": "completePickUpLine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserPickUpLineArray",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getPickUpLine",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "line",
            "type": "string"
          }
        ],
        "internalType": "struct PickUpLiner.PickUpLine",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPickUpLineLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// check if account connected
if (typeof ethereum !== "undefined") {
  ethereum.request({ method: "eth_requestAccounts" });
} else {
  alert("Veuillez SVP installer une wallet MetaMask");
}

// check if account is changed
window.ethereum.on('accountsChanged', async function (accounts) {
  userAccount = accounts[0];
  await renderMenu();
});

// init web 3 variables
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
const contractAddress = '0x5683E8B1C1D49Cac830E48191dB5298FD2d80e3A';
const mainBody = document.getElementById('mainBody');
let tokenContract = new web3.eth.Contract(pickUpLineAbi, contractAddress);
let userAccount;

async function getAccount(){
  userAccount = (await web3.eth.getAccounts())[0];
}

// init all
async function initAll(){
  await getAccount();
  await renderMenu();
}

initAll();