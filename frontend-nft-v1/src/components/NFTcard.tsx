import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

//import useAppContext from './context/appContext'

interface Props {
    image: string;
    title: string;
    description: string;
}


const NFTcard : React.FC<Props> = ({image,title,description}) => {
 // const { updateModalStatusAndModalNft } = useAppContext();

  return (
    <Card sx={{ maxWidth: 250 ,width: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt="dude"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NFTcard;
