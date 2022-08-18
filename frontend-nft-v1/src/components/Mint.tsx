import React from 'react';
import { Paper, Box, Button } from '@mui/material';

/**
 * THIS FEATURE IS UNDER DEVELOPMENT AND WILL BE AN ALTERNATIVE TO THE CURRENT METHOD OF MINTING NFTS FROM A CANDY MACHINE
 */
const Mint:React.FC = () => {
  return (
    <div className='grid place-items-center' data-testid='mint-screen'>
      <Box
        sx={{
          '& > :not(style)': {
            m: 10,
            width: 500,
            height: 500,
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>
      <Button variant='outlined'>Mint</Button>
    </div>
  );
}

export default Mint;
