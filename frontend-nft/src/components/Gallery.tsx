import React, {useState,useEffect} from 'react'
import NFTcard from './NFTcard';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {Metaplex, Nft} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js';


const Gallery:React.FC = () => {
    const [NFTS, setNFTS] = useState<Nft[]>([]);
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const candyMachine = new PublicKey("HmU89dxJzF2qMDu7C3fZrtEgGm7GxVoZqDy5T7KnMzmK");
    const metaplex = new Metaplex(connection);

    

    useEffect( () => {
        if(!connection || !publicKey) { 
          alert("no key or connection")
          return 
        }
      metaplex.nfts().findAllByCandyMachine(candyMachine,2).then((nfts)=>{
      setNFTS(nfts)
      console.log("nfts should be set")
     }).catch((error) => {
        console.log(error)
     })
    })


  
  return (
    <div>
      {NFTS.map(nft => {
        return (
          <NFTcard image={nft.uri} title={nft.name} />
        )
      })}
      </div>
  )
}

export default Gallery