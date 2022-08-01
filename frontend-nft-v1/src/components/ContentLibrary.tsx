import React,{useState,useEffect} from 'react';
import useAppContext from './context/appContext'
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {NFT} from './types/types';

interface Props {
  contentType:string;
  setParentNFT: (NFT:NFT ) => void;
  mutate: (NFT:NFT) => void;
  parentNFT:NFT|undefined;
}

const ContentLibrary: React.FC<Props> = ({contentType,setParentNFT,mutate,parentNFT}) => {
  const [dudes,setDudes] = useState<NFT[]>([])
  const {NFTs} =useAppContext();
  let key = 0;
  //let attributeTypes:{[key:string]:any} =  {'head decorations': attributes.headdecoration,'layer 0':attributes.layer_0,'layer 1': attributes.layer_1,'layer 2': attributes.layer_2,'layer 3':attributes.layer_3,'layer 4':attributes.layer_4,'layer 5':attributes.layer_5,'layer 6': attributes.layer_6,'layer 7': attributes.layer_7,'layer 8':attributes.layer_8,'layer 9':attributes.layer_9,'layer 10': attributes.layer_10,'layer 11':attributes.layer_11,'layer 12':attributes.layer_12,'layer 13': attributes.layer_13};
  useEffect(() =>{
  setDudes(NFTs);
  },[NFTs]);

 const  click = (d:NFT) => {
    setParentNFT(d) 
    if(parentNFT) mutate(parentNFT);
  }
  
  return(
    <div className='w-64 bg-sky-800 h-full overflow-y-scroll flex flex-col'>
      {dudes.map(d => (
        <div key={key++} className='p-5'>
        <Card  sx={{ width: 150}}  onClick={() => click(d)}>
          <CardMedia 
          component="img"
          height="240"
          image={d.image}
          alt="dude">
          </CardMedia>
        </Card>
        </div>
      ))}
    </div>);
}

export default ContentLibrary;
