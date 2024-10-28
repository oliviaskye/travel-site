import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useValue } from '../../../../context/ContextProvider';

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const {
    state: { currentUser }, 
    dispatch,
  } = useValue();

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file.name.split('.').pop();
      try {
        // استبدل هذا الجزء بكود رفع الملفات الفعلي
        const url = await fakeUploadFile(file, imageName);

        dispatch({ type: 'UPDATE_IMAGES', payload: url });
        setImageURL(null);
      } catch (error) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { open: true, severity: 'error', message: error.message },
        });
        console.log(error);
      }
    };

    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file, dispatch]);

  const fakeUploadFile = async (file, imageName) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            resolve(`http://fakeurl.com/${imageName}`); // هنا يجب أن تكون URL الفعلية
            return 100;
          }
          return prev + 10; // محاكاة تقدم التحميل
        });
      }, 100);
    });
  };

  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <div> {/* هنا يمكنك إضافة مكون آخر بدلاً من CircularProgressWithLabel */}
              <p>{`Loading: ${progress}%`}</p>
            </div>
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: 'lightgreen' }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0, .5)',
};
