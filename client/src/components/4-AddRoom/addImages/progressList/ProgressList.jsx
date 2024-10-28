import { ImageList } from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem';

const ProgressList = ({ files = [] }) => {
  return (
    <ImageList
      rowHeight={250}
      sx={{
        '&.MuiImageList-root': {
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))!important',
        },
      }}
    >
      {files.length > 0 ? (
        files.map((file, index) => (
          <ProgressItem file={file} key={index} />
        ))
      ) : (
        <p>No files available</p>
      )}
    </ImageList>
  );
};

export default ProgressList;