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
    <div className='w-3/12 h-full flex flex-row'>
      <div className='flex flex-col w-3/12 pl-3 bg-sky-900' >
        <Button onClick={() => contentTypeMutator('dudes')}>
          dudes
        </Button>
        <Button onClick={() => contentTypeMutator('attributes')}>
          attributes
        </Button>
      </div>
      {contentType === '' ? null: <ContentLibrary contentType={contentType} /> }
    </div>
  );
}

export default Sidebar;
