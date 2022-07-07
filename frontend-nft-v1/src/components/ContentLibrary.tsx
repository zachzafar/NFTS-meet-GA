import React from 'react';
import {Typography} from '@mui/material'

interface Props {
  contentType:string;
}

const ContentLibrary: React.FC<Props> = ({contentType}) => {
  
  return( <div className='w-full bg-gray-900 h-full'>
    <Typography variant='h6'>{contentType}</Typography>
    </div>);
}

export default ContentLibrary;
