import React, {useEffect} from 'react';
import {useWallet, useConnection} from '@solana/wallet-adapter-react';
import LoginHolders from './LoginHolders'
import Gallery from './Gallery';
import {Metaplex} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js'
import useAppContext from '../func/appContext'


function Holders() {
  const { publicKey } = useWallet();
  const {connection} = useConnection();
  const {updateUserStatus,userStatus} = useAppContext();


  useEffect(() => {
    
    const collectionAddress:PublicKey = new PublicKey("BEmm53XQpy54vDSZ8efN9CxTwtbrCSXqezUvifoKmvZv")
    if(publicKey === null) {return;}
    const metaplex = new Metaplex(connection);
    let pubKey;
    const authenticateNFT = async () => {
    const nfts = await metaplex.nfts().findAllByOwner(publicKey);
    for(let i = 0; i < nfts.length; i++) {
       pubKey = nfts[i]['collection'] ?? null;
       if(pubKey !== null && collectionAddress.equals(pubKey['key'])){
        updateUserStatus(true);
        return;
      }
      }
      alert('Sorry but you need to have a dude to access the net page');
    }
    authenticateNFT();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[publicKey,connection,userStatus])
  
  return (
    <div>
     {userStatus ? <Gallery/>: <LoginHolders/>} 
    </div>
  );
}

export default Holders;
