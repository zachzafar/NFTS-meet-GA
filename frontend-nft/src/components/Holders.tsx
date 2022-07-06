import React, {useState,useEffect} from 'react';
import {useWallet} from '@solana/wallet-adapter-react';
import LoginHolders from './LoginHolders'


function Holders() {
  let [walletStatus,setWalletStatus] = useState(false);
  const wallet = useWallet();

  useEffect(() => {
    wallet.connect()
  });

  
  return (
    <div>
     {walletStatus ? <h1>holders</h1>: <LoginHolders/>} 
    </div>
  );
}

export default Holders;

//