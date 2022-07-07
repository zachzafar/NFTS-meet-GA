import React, { useState } from 'react';
import ContentLibrary from './ContentLibrary';
import {Button} from '@mui/material';

const Sidebar:React.FC = () => {
  let [contentType, setContentType] = useState('');

  const contentTypeMutator = (newContentType: string) => {
    if(contentType === newContentType){
      setContentType('')
    } else {
      setContentType(newContentType)
    }
  }

  return (
    <div className='flex flex-row w-32'>
      <div className='flex flex-col h-full bg-gray-900 p-2' >
        <Button onClick={() => contentTypeMutator('dudes')}>
          dudes
        </Button>
        <Button onClick={() => contentTypeMutator('attributes')}>
          attributes
        </Button>
      </div>
      {contentType === '' ? <ContentLibrary contentType={contentType} /> : null}
    </div>
  );
}

export default Sidebar;
