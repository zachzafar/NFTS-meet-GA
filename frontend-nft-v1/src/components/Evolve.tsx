import React, {useState,useEffect, Dispatch, SetStateAction} from 'react';
import {useParams} from 'react-router-dom'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Button, Card, CardMedia, Paper } from '@mui/material';
import ContentLibrary from './ContentLibrary';
import * as attributes from '../assets/utils/utils'
import {NFT} from './types/types'
import mergeImages from 'merge-images';
import {bundlrStorage, Metaplex, useMetaplexFileFromBrowser, walletAdapterIdentity} from '@metaplex-foundation/js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
//import { PublicKey } from '@solana/web3.js'
//import {Collection} from '@metaplex-foundation/mpl-token-metadata'

const Evolve:React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contentType, setContentType] = useState('');
  const [parent1NFT, setparent1NFT] = useState<NFT>()
  const [parent2NFT, setparent2NFT] = useState<NFT>()
  const [child1NFT, setchild1NFT] = useState<NFT>()
  const [child2NFT, setchild2NFT] = useState<NFT>()
  const {connection} = useConnection();
  const  wallet = useWallet();
  const {type}= useParams();
  //const collection:Collection = {verified: true, key: new PublicKey(`${process.env.REACT_APP_CANDY_MACHINE_MINT_ADDRESS}`) }
  let recipe:{[key:string]:any} = [attributes.headdecoration,attributes.layer_0,attributes.layer_1,attributes.layer_2,attributes.layer_3,attributes.layer_4,attributes.layer_5,attributes.layer_6,attributes.layer_7,attributes.layer_8,attributes.layer_9,attributes.layer_10,attributes.layer_11,attributes.layer_12,attributes.layer_13]
  let cards:ReactJSXElement;
  let sidebarOptions:string[] = ['dudes','head decorations','layer 0','layer 1','layer 2','layer 3','layer 4','layer 5','layer 6','layer 7','layer 8','layer 9','layer 10','layer 11','layer 12','layer 13']
  /*
  const contentTypeMutator = (newContentType: string) => {
    if(contentType === newContentType){
      setContentType('')
    } else {
      setContentType(newContentType)
    }
  }
  */
  const setParentNFT = (NFT:NFT) => {
      if(parent1NFT === undefined){
        setparent1NFT(NFT);
        return;
      } 
      if (parent2NFT === undefined){
        setparent2NFT(NFT);
        return;
      }
      if(parent1NFT !== undefined){
        setchild1NFT(undefined);
        setchild2NFT(undefined);
        setparent1NFT(NFT);
        return;
      }
        if(parent2NFT !== undefined){
        setparent2NFT(NFT);
        return;
      }
  }



const generateDudeNFT = (parents:string[],DNA:string[],setNft:Dispatch<SetStateAction<NFT | undefined>>) =>  {
  let ingredients = []
  let ingredientType;
  let ingredientNumber;
  let childNFT:NFT;
  let childDNA:string = ''
  let realIndex;
  
  
  for( let i = 0; i < DNA.length; i++){
    if(i === 0){
      childDNA = childDNA + DNA[i] + ','
    } else {
      childDNA = childDNA  + ',' + DNA[i] + ','
    }
    if(DNA[i] === '-1') { continue }
    realIndex = String(parseInt(DNA[i]) - 1)
    ingredientType = recipe[i]
    ingredientNumber = realIndex;
    ingredients.push(ingredientType[ingredientNumber])
  }
  ingredients = ingredients.filter((ingredient: undefined | string) => ingredient !== undefined);
  mergeImages(ingredients, {
    crossOrigin: 'anonymous',
  }).then(image =>{
      childNFT = { mint: '' , name: 'New Dude', image: image, description:'new dude minted from evolutionary process',DNA:childDNA, parentMintAddresses: parents}
      setNft(childNFT);
      
  })
}

  const crossover = (parent1NFT:NFT, parent2NFT:NFT) => {
    if(parent1NFT.DNA === undefined || parent2NFT.DNA === undefined) {
      console.log("crossover function was called but DNA in parents not present")
      return
    }

    let parent1DNA = parent1NFT.DNA.replace('[','').replace(']','').split(',')
    let parent2DNA = parent2NFT.DNA.replace('[','').replace(']','').split(',')
    let child1DNA:string[] = [];
    let child2DNA:string[] = [];
    for(let i=0; i < Math.round(parent1DNA.length/2); i++) {
        child1DNA.push(parent1DNA[i])
    }
    for(let i=8; i < parent1DNA.length; i++) {
        child2DNA.push(parent1DNA[i])
    }
    for(let i=0; i < Math.round( parent2DNA.length/2); i++) {
        child2DNA.push(parent2DNA[i])
    }
    for(let i=8; i < parent2DNA.length; i++) {
        child1DNA.push(parent2DNA[i])
    }
    generateDudeNFT([parent1NFT.mint,parent2NFT.mint],child1DNA,setchild1NFT)
    generateDudeNFT([parent1NFT.mint,parent2NFT.mint],child2DNA,setchild2NFT)
  }

  const mutate = (parentNFT:NFT,attributeType?:string,attributeIndex?:string) => {
    if(parentNFT.DNA === undefined) {
      console.log('mutate function was called but parent dna not present')
      return
    }
    let childDNA = parentNFT.DNA.replace('[','').replace(']','').split(',')
    let randomIndex = Math.floor(Math.random() * childDNA.length);
    let randomIngredientIndex = Math.floor(Math.random() * recipe[randomIndex].length);
    childDNA[randomIndex] = String(randomIngredientIndex);
    if(attributeType && attributeIndex){
      let attribute = sidebarOptions.indexOf(attributeType)
      childDNA[attribute] = attributeIndex
    }
    generateDudeNFT([parentNFT.mint],childDNA,setchild1NFT);
  }

  const mint =  async (NFT:NFT) => {
    if (wallet === null) {return};
    console.log('minting....')
    let res = await fetch(NFT.image)
    let data = await res.blob()
    let metadata = {
      type: 'image/png'
    }
    let file = new File([data],'image.png',metadata)
    let parentAddress1 = ''
    let parentAddress2 = ''
    if(NFT.parentMintAddresses !== undefined){
      parentAddress1 = NFT.parentMintAddresses[0] ?? ''
      parentAddress2 = NFT.parentMintAddresses[1] ?? ''
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const metaplex = new Metaplex(connection).use(walletAdapterIdentity(wallet)).use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
    providerUrl: 'https://api.devnet.solana.com',
    timeout: 60000,
}));
    const { uri } = await metaplex.nfts().uploadMetadata({
      "name": "new Number #0001",
    "symbol": "NB",
  "description": "Collection of 10 numbers on the blockchain. This is the number 1/10.",
  "seller_fee_basis_points": 500,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  "image": await useMetaplexFileFromBrowser(file),
  "attributes": [
    { "trait_type": "DNA", "value": NFT.DNA },
    { "trait_type": "Parent-1", "value": parentAddress1 },
    { "trait_type": "Parent-2", "value": parentAddress2 },
  ],
  "properties": {
    "creators": [
      {
        "address": "9GibCRCBNaTPTphDBbvD19onKZqQJPLeY5Zv8gCWWhcm",
        "share": 100
      }
    ],
    "files": [{ "uri": "0.png", "type": "image/png" }]
  },
  "collection": { "name": "numbers", "family": "numbers" }
    })

    
    const { nft } = await metaplex.nfts().create({
      uri: uri,
    //  collection: collection
    })
    console.log(nft)
  }

  const burn = async (NFT:NFT) => {
    /*
    let tokenAccount
    const mintPubKey = new PublicKey(NFT.mint)
    const ownerAccount = wallet.publicKey
    const burnAddress = new PublicKey('inknkdnimiodmomoceimvnidls')
    if(ownerAccount !== null){
       tokenAccount = await connection.getTokenAccountsByOwner(ownerAccount,{ mint: mintPubKey})
    }
    
    
    let tx = new Transaction().add(createBurnCheckedInstruction(tokenAccount,mintPubKey,ownerAccount,1e8,8))
    
    const signature = await wallet.sendTransaction(tx, connection);
*/

    return
  }

  const mintAndBurn = () => {
    if(!child1NFT && !child2NFT){return}
    console.log('minting and burning')
    if(child1NFT && parent1NFT){
      console.log('minting new mutation');
      mint(child1NFT)
      burn(parent1NFT)
    } else if (child1NFT && child2NFT && parent1NFT && parent2NFT){
      console.log('minting new crossover')
      mint(child1NFT)
      mint(child2NFT)
      burn(parent1NFT)
      burn(parent2NFT)
    }

  }

  switch (type) {
    case 'mutate':
    if(parent1NFT && child1NFT === undefined ){mutate(parent1NFT)}
    cards = (<div className="w-full h-full grid place-items-center mt-1">
        <Card sx={{ maxWidth: 250 ,width: 250 ,  }}>
          {parent1NFT ? <CardMedia 
          component="img"
          height="250"
          image={parent1NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 250,
            height: 250,
            padding: 5 
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card> 
         <Card sx={{ maxWidth: 250 , width: 250,  }}>
          {child1NFT ?
          <CardMedia 
          component="img"
          height="250"
          image={child1NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 250,
            height: 250,
            padding: 5 
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card>
        {child1NFT ? <Button variant='outlined' onClick={() => {mintAndBurn()}}>Mint</Button> : null}
        </div>)  
    break;
    case 'crossover':
       if(parent1NFT && parent2NFT && child1NFT === undefined){crossover(parent1NFT,parent2NFT);}
    cards = ((<div className="w-full h-full grid place-items-center">
        <div className="flex flex-row">
          <Card sx={{ maxWidth: 250, width:250,   }}>
          {parent1NFT ? <CardMedia 
          component="img"
          height="250"
          image={parent1NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 250,
            height: 250,
            padding: 5 
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card> 
         <Card sx={{ maxWidth: 250, width: 250,   }}>
          {parent2NFT ?
          <CardMedia 
          component="img"
          height="250"
          image={parent2NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 250,
            height: 250,
            padding: 5 
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card>
      </div>
      <div className='flex flex-row'>
        <Card sx={{ maxWidth: 250, width: 250,  }}>
          {child1NFT ? 
          <div>
          <CardMedia 
          component="img"
          height="250"
          image={child1NFT.image}
          alt="dude">
          </CardMedia> 
          </div>
          : <Box
        sx={{
          '& > :not(style)': {
            width: 250,
            height: 250,
            padding: 5 
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card> 
         <Card sx={{ maxWidth: 250, width: 250,  }}>
          {child2NFT ?
          <CardMedia 
          component="img"
          height="250"
          image={child2NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 250,
            height: 250,
            padding: 5 
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />  
      </Box>}
        </Card>
      </div>
      {child1NFT ? <Button variant='outlined' onClick={() => {mintAndBurn()}}>Mint</Button> : null}
        </div>) )  
    break;
    default:
      cards = (<div>Hmm something wrong here</div>)
  }


    useEffect(() => {
    setchild1NFT(undefined)
    setchild2NFT(undefined)
    setparent1NFT(undefined)
    setparent2NFT(undefined)
  },[type])

  return (
  <div className='flex flex-row h-full w-full'>
    <ContentLibrary mutate={mutate} setParentNFT={setParentNFT} contentType={contentType} parentNFT={parent1NFT}/>
    {cards}
  </div>
  );
}

export default Evolve;






