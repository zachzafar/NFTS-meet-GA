import React, {useState,useEffect} from 'react';
import {useWallet} from '@solana/wallet-adapter-react';
import LoginHolders from './LoginHolders'
import Gallery from './Gallery';


function Holders() {
  let [walletStatus,setWalletStatus] = useState(false);
  const { publicKey } = useWallet();

  useEffect(() => {
    publicKey ? setWalletStatus(true) : setWalletStatus(false);
  },[publicKey])
  
  return (
    <div>
     {walletStatus ? <Gallery/>: <LoginHolders/>} 
    </div>
  );
}

export default Holders;

//