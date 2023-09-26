import React from 'react';
import FunctionDropdown from './components/FunctionDropdown.native';
import Describe from './components/Describe.native';
import RateFunction from './components/RateFunction';
import Command from './components/Command';
import useStore from './app/store';

const Body = () => {
  const postFeedback = useStore(state => state.postFeedback);
  const updateFeedbackInfo = useStore(state => state.updateFeedbackInfo);

  const handleOnClick = async () => {
    postFeedback();
    resetPropDescribe();
  };
  const resetPropDescribe = () => {
    updateFeedbackInfo('inputMessage', '');
    updateFeedbackInfo('selectedFile', null);
    updateFeedbackInfo('selectedImage', null);
  };
  return (
    <div className='body'>
      <FunctionDropdown />
      <Describe />
      <RateFunction />
      <Command handleOnclick={handleOnClick} />
    </div>
  );
};

export default Body;
