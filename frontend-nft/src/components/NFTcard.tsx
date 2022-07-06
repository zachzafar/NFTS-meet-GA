import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
    image: string;
    title: string;
    description: string;
}


const NFTcard : React.FC<Props> = ({image,title,description}) => {
  return (
    <Card sx={{ maxWidth: 145 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
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