import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setImagesLoaded } from '../chatBoardSlice';
import useStableDispatch from '../../customHook/useStableDispatch';
const propTypes = {
  imageContent: PropTypes.string.isRequired
};

const ImageDisplay = ({ imageContent }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageDimensions, setImageDimensions] = useState({
    width: 1,
    height: 1
  });
  const dispatch = useStableDispatch();

  useEffect(() => {
    const base64ToBlob = (base64Data, contentType) => {
      contentType = contentType || '';
      const sliceSize = 1024;
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      return new Blob(byteArrays, { type: contentType });
    };
    const blob = base64ToBlob(imageContent, 'image/jpg');
    const objectURL = URL.createObjectURL(blob);

    setImageUrl(objectURL);
    const image = new Image();
    image.src = objectURL;
    image.onload = () => {
      setImageDimensions({ width: image.width, height: image.height });
    };
    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [imageContent]);

  const ratio = (() => {
    const { width, height } = imageDimensions;
    const maxSize = 300;
    if (width < maxSize && height < maxSize) {
      return 1;
    }
    return width > height ? width / maxSize : height / maxSize;
  })();

  const handleImageLoad = () => {
    dispatch(setImagesLoaded());
  };
  return (
    <>
      {imageUrl && (
        <img
          onLoad={handleImageLoad}
          className='image-responsive'
          width={imageDimensions.width / ratio}
          height={imageDimensions.height / ratio}
          src={imageUrl}
        />
      )}
    </>
  );
};

ImageDisplay.propTypes = propTypes;

export default ImageDisplay;
