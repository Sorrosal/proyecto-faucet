const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");
const express = require("express");
const fs = require("fs")
const cors = require("cors")
const app = express();
app.use(cors())
app.listen(3333);

const json = JSON.parse(fs.readFileSync("../nodo/data/keystore/UTC--2023-02-24T12-10-53.164120940Z--018e200424a51d008b3332ec88e9fefc7d6a619c"))
console.log(json)
app.get("/faucet/:address", async (req, res) =>{
    const account = await web3.eth.accounts.decrypt(json, "1234")
    const tx = {
        chainId: 8888,
        to: req.params.address,
        from: account.address,
        gas: 30000,
        value: web3.utils.toWei("0.1", 'ether')
    }
    const txSigned = await account.signTransaction(tx)
    const respuesta = await web3.eth.sendSignedTransaction(txSigned.rawTransaction)
    res.send(respuesta)
})
app.get("/balance/:address", async (req,res) =>{
    web3.eth.getBalance(req.params.address)
    .then(saldo =>{
        
        res.send(saldo)
    }).catch(err =>{
        res.send(err)
    })
})
