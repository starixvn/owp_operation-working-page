import React, { useState } from 'react';
import FunctionDropdown from './components/FunctionDropdown.native';
import Describe from './components/Describe.native';
import RateFunction from './components/RateFunction';
import Command from './components/Command';

const Body = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleOnClick = () => {
    //logic here
    resetPropDescribe();
  };
  const resetPropDescribe = () => {
    setInputMessage('');
    setSelectedImage(null);
    setSelectedFile(null);
  };
  return (
    <div className='body'>
      <FunctionDropdown />
      <Describe
        handleInputChange={setInputMessage}
        handleImageChange={setSelectedImage}
        handleFileChange={setSelectedFile}
        selectedFile={selectedFile}
        selectedImage={selectedImage}
        inputMessage={inputMessage}
      />
      <RateFunction />
      <Command handleOnclick={handleOnClick} />
    </div>
  );
};

export default Body;
