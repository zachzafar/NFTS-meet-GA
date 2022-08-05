import React,{useState,useEffect} from 'react';
import useAppContext from './context/appContext'
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {NFT} from './types/types';

/**
 * Interface describing props for ContentLibrary component
 * @interface
 */
interface Props {
  setParentNFT: (NFT:NFT ) => void;
  mutate: (NFT:NFT) => void;
  parentNFT:NFT|undefined;
}

/**
 * Display all the dudes owned by the user
 * @param {function} setParentNFT updates the state of the Evolve component with an NFT object
 * @param {function} mutate mutate function changes the DNA attribute of an NFT object
 * @param {NFT} parentNFT represents parent NFT Object
 * @returns {ReactJSXElement} 
 */
const ContentLibrary: React.FC<Props> = ({setParentNFT,mutate,parentNFT}) => {
  const [dudes,setDudes] = useState<NFT[]>([])
  const {NFTs} =useAppContext();
  let key = 0;

  useEffect(() =>{
  setDudes(NFTs);
  },[NFTs]);

 const  click = (d:NFT) => {
    setParentNFT(d) 
    if(parentNFT) mutate(parentNFT);
  }
  
  return(
    <div className=' bg-gray-900 h-full overflow-y-scroll fixed flex flex-col'>
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
