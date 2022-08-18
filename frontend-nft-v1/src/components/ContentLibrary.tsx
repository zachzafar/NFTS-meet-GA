import React,{useState,useEffect} from 'react';
import useAppContext from './context/appContext'
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {NFT} from './types/types';

/**
 * Interface describing props for ContentLibrary component
 */
interface Props {
  setParentNFT: (NFT:NFT,type:string|undefined ) => void;
  type: string|undefined;
}

/**
 * Display all the dudes owned by the user
 * Takes a function called setParentNFT which updates the state of the Evolve component with an NFT object
 * 
 */
const ContentLibrary: React.FC<Props> = ({setParentNFT,type}) => {
  const [dudes,setDudes] = useState<NFT[]>([])
  const {NFTs} =useAppContext();
  let key = 0;

  useEffect(() =>{
  setDudes(NFTs);
  },[NFTs]);

 const  click = (d:NFT) => {
    setParentNFT(d,type) 
  }
  
  return(
    <div className=' bg-gray-900 h-full overflow-y-scroll fixed flex flex-col' data-testid='evolve-sidebar'>
      {dudes.map(d => (
        <div key={key++} className='p-5' data-testid='dudes-insidebar'>
        <Card  sx={{ width: 150}}  onClick={() => click(d)} data-testid='dude-imagebutton'>
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
