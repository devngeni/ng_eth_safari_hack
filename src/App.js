import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Web3Modal from "web3modal";
import {providerOptions} from './providerOptions'
import { ethers } from 'ethers';

const web3Modal = new Web3Modal({
  cacheProvider:true,
  providerOptions // required
});

const App = () => {
  const [rate, setConversion] = useState('')
  const [value, setValue] = useState('')
  const [account, setAccount ]=useState("")
  const [address, setAddress ]=useState("")

  const connectWallet = async () => {
    try {
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        setAccount(String(accounts[0]).substring(0, 5) + "..." + String(accounts[0]).substring(38));
        setAddress(accounts[0])
    } catch (error) {
        console.log("connection failed!?", error)
    }
}
useEffect(() => {
    if (web3Modal.cachedProvider) {
        connectWallet();
    }
});

  axios.get('https://v6.exchangerate-api.com/v6/92faf84f2371c56a5e84f27c/pair/KES/USD')
          .then(response=> {
            console.log(response.data.conversion_rate)
            setConversion(response.data.conversion_rate)
          },err=>{
            console.log(err);
          })

          const handleChange = (event) => {
            const result = event.target.value.replace(/\D/g, ''); //only numbers
            setValue(result);
        };

        const handleSubmit = (data) => {
          console.log('data', data)
        }
          
  return (
    <div className='App'>
      <div className='container '>
        <form action="/api/mpesaPayment" method="post">
        <div className='inputname'>Amount
          <input type="text" className="" name="amountKsh" placeHolder="amount in Ksh" value={value} onChange={handleChange}></input>          
        </div>
        <div className='amountUS'>          
        <p>The amount in USDT: <span className="usdStyle">{value * rate}</span></p>
        </div>
      
        <div className='inputname'>PhoneNumber
          <input type="text" className="" name="phone" placeHolder="phone"></input>
        </div><div className='inputname' value={address}>Address
          <input type="text" className="" name="walletAddress" placeHolder="0x000000000000"></input>
        </div>
        
        <button className='exchange'>Exchange</button>
        </form>
      </div>
      <button className='connect' onClick={connectWallet}>Connect wallet:{account}</button>
    </div>
  )
}

export default App


