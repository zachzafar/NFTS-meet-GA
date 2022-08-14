import React, {useEffect} from 'react';
import {useWallet, useConnection} from '@solana/wallet-adapter-react';
import LoginHolders from './LoginHolders'
import Gallery from './Gallery';
import {Metaplex} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js'
import useAppContext from './context/appContext'

/**
 * Component used to display user NFTs and authenticate users
 */
const  Holders:React.FC = () => {
  const { publicKey } = useWallet();
  const {connection} = useConnection();
  const {updateUserStatus,userStatus} = useAppContext();


  /**
   * Checks if user has an Nft from the collection and updates the user status
   * Updates the status of a user(whether they have an Nft from the colection or not)
   */
  const authenticateNFT = async () => {
    if(publicKey === null) {return;}
    const collectionAddress:PublicKey = new PublicKey(`${process.env.REACT_APP_CANDY_MACHINE_MINT_ADDRESS}`)
    const metaplex = new Metaplex(connection);
    let pubKey;
    let name;
    const nfts = await metaplex.nfts().findAllByOwner(publicKey);
      for(let i = 0; i < nfts.length; i++) {
        pubKey = nfts[i]['collection'] ?? null;
        name = nfts[i]['name'] ?? null;
        if(pubKey !== null && collectionAddress.equals(pubKey['key'])){
          updateUserStatus(true);
          return;
        } else if(name === 'DudeOnChain'){
          updateUserStatus(true);
          return;
        }
      }
      alert('sorry you need a dude to enter this are')
    }

  useEffect(() => {
    authenticateNFT();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[publicKey])
  
  return (
    <div className="h-full w-full">
     {userStatus ? <Gallery/>: <LoginHolders/>} 
    </div>
  );
}

export default Holders;
