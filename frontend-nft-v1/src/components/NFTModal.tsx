import React from 'react' 
import { NFT } from './types/types'
import { Link } from 'react-router-dom'
import { Button, Card, CardMedia, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import useAppContext from './context/appContext'

interface Props {
  NFT:NFT
}

const NFTModal:React.FC<Props> = ({NFT}) => {
  const {updateModalStatusAndModalNft} = useAppContext();
  let parentAddress1 = ''
  let parentAddress2 = ''
    if(NFT.parentMintAddresses !== undefined){
      parentAddress1 = NFT.parentMintAddresses[0] ?? ''
      parentAddress2 = NFT.parentMintAddresses[1] ?? ''
    }
  return (
    <div className='absolute w-6/12 bg-gray-700 p-24 rounded-lg shawdow-lg  z-10'>
      <CloseIcon fontSize='large' onClick={() => updateModalStatusAndModalNft(false,undefined)}/>
      <Card>
        <CardMedia
        component='img'
        height='300'
        image={NFT.image}
        alt='dude'
        >
        </CardMedia>
      </Card>
      <Typography>{NFT.name}</Typography>
      <Typography>{NFT.description}</Typography>
      <Typography>{NFT.mint}</Typography>
      <Typography>{parentAddress1}</Typography>
      <Typography>{parentAddress2}</Typography>
      <Button component={Link} to='/familyTree' variant='contained'>Explore Tree</Button>
    </div>
  )
}

export default NFTModal
