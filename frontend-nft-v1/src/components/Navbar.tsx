import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import useAppContext from './context/appContext'

/**
 * Displays the Navbar
 */
const Navbar:React.FC = () => {
  let { pathname } = useLocation();
  let {userStatus} = useAppContext();
  let stack;
  switch (pathname) {
    case '/':
      stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/mint' color='inherit' data-testid='mint-button'>
            Mint
          </Button>
          <Button component={Link} to='/holders' color='inherit' data-testid='holders-button'>
            Holders
          </Button>
        </Stack>
      );
      break;
    case '/mint':
      stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/' color='inherit' data-testid='home-button'>
            Home
          </Button>
        </Stack>
      );
      break;
    case '/holders':
      stack = (
        <Stack direction='row' spacing={2}>
          {userStatus  ?
          <Button component={Link} to='/evolve/crossover' color='inherit' data-testid='evolve-button'>
            Evolve
          </Button> : null}
          <Button component={Link} to='/mint' color='inherit' data-testid='mint-button'>
            Mint
          </Button>
          <Button component={Link} to='/' color='inherit' data-testid='home-button'>
            Home
          </Button>
        </Stack>
      );
      break;
    case '/evolve/crossover':
      stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/' color='inherit' data-testid='home-button'>
            Home
          </Button>
          <Button component={Link} to='/holders' color='inherit' data-testid='holders-button'>
            Holders
          </Button>
          <Button component={Link} to='/evolve/mutate' color='inherit' data-testid='mutate-button'>Mutate</Button>
        </Stack>
      );
      break;
      case '/evolve/mutate':
        stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/' color='inherit' data-testid='home-button'>
            Home
          </Button>
          <Button component={Link} to='/holders' color='inherit' data-testid='holders-button'>
            Holders
          </Button>
          <Button component={Link} to='/evolve/crossover' color='inherit' data-testid='crossover-button'>Crossover</Button>
        </Stack>
        );  
      break;
      case '/familyTree':
      stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/' color='inherit' data-testid='home-button'>
            Home
          </Button>
          <Button component={Link} to='/holders' color='inherit' data-testid='holders-button'>
            Holders
          </Button>
        </Stack>
      ); 
      break;
    default:
      stack = null;
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} data-testid='navbar-title'>
          dudesonchain
        </Typography>
        {stack}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
