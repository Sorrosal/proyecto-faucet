import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [cuenta, setCuenta] = useState(null)
  const [tx, setTx] = useState(null)
  const [saldo, setSaldo] = useState(null)
  useEffect(() =>{
    window.ethereum.request({
      method:"eth_requestAccounts"
    }).then(cuentas =>{
      setCuenta(cuentas[0])
      window.ethereum.on("accountsChanged", (cuentas) => {
        setCuenta(cuentas[0])
      })
    })
  }, [])
  
  useEffect(() =>{
    async function saldo(){
    const url = `http://localhost:3333/balance/${cuenta}`
    console.log(url)
    const response = await fetch(url)
    const json = await response.json()
    setSaldo(json)
  }
  if(cuenta)
    saldo()
  }, [cuenta])


  async function invocarFaucet(){
    const url = `http://localhost:3333/faucet/${cuenta}`
    console.log(url)
    const response = await fetch(url)
    const json = await response.json()
    setTx(json)
  }

  return (
    <div>
    <h1>{cuenta}</h1>
    <h3>saldo: {saldo}</h3>
    <button onClick={() => invocarFaucet()}>Enviar 0,1 ETH</button>
    <div>{JSON.stringify(tx,null, 4)}</div>
    </div>
  )
}

export default App
