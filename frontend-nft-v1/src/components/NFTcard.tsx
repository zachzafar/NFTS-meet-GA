import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {NFT} from './types/types'
import useAppContext from './context/appContext';


interface Props {
    NFT:NFT
}

/**
 * Displays the image as well as name and description of and NFT object when clicked a modal screen with more details is displayed
 * @param {NFT} NFT NFT object containing data used to populate the component
 * @returns {ReactJSXElement}
 */
const NFTcard : React.FC<Props> = ({NFT}) => {
  const { updateModalStatusAndModalNft } = useAppContext();

  return (
    <div className="py-3">
    <Card sx={{ maxWidth: 250 ,width: 250}} onClick={() => updateModalStatusAndModalNft(true,NFT)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={NFT.image}
          alt="dude"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {NFT.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {NFT.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}

export default NFTcard;
