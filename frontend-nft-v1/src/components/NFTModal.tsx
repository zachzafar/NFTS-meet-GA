import React from 'react' 
import { NFT } from './types/types'
import { Link } from 'react-router-dom'
import { Button, Card, CardMedia, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import useAppContext from './context/appContext'

interface Props {
  NFT:NFT
}

/**
 * Displays a modal screen which contains more details about the NFT such as its mint address and its parent addresses
 * it also displaya button which when clicked displays the family Tree of the NFT
 * @param {NFT} NFT NFT objrct which is used to populate the modal screen
 * @returns {ReactJSXElement}
 */
const NFTModal:React.FC<Props> = ({NFT}) => {
  const {updateModalStatusAndModalNft} = useAppContext();
  let parentAddress1 = ''
  let parentAddress2 = ''
    if(NFT.parentMintAddresses !== undefined){
      parentAddress1 = NFT.parentMintAddresses[0] ?? ''
      parentAddress2 = NFT.parentMintAddresses[1] ?? ''
    }
  return (
    <div className="h-screen w-screen ">
    <div className='absolute w-5/12 bg-gray-900 p-14 rounded-lg shawdow-lg  top-1/4 left-1/4 '>
      <CloseIcon fontSize='large' onClick={() => updateModalStatusAndModalNft(false,undefined)}/>
      <Card>
        <CardMedia
        component='img'
        height='200'
        width='200'
        image={NFT.image}
        alt='dude'
        >
        </CardMedia>
      </Card>
      <Typography>Name: {NFT.name}</Typography>
      <Typography>Description: {NFT.description}</Typography>
      <Typography>Mint Address: {NFT.mint}</Typography>
      <Typography>Parent 1 Address: {parentAddress1}</Typography>
      <Typography>Parent 2 Address:{parentAddress2}</Typography>
      <Button component={Link} to='/familyTree' variant='contained' onClick={() => updateModalStatusAndModalNft(false,null)}>Explore Tree</Button>
    </div>
    </div>
  )
}

export default NFTModal
