import React, { useState } from 'react';
import { TEditSetting } from '../EditType';

interface CommonTextAreaProps {
  value: string;
  inputKey: keyof TEditSetting;
  updateObject: Function;
  rows?: number
}

const CommonTextArea: React.FC<CommonTextAreaProps> = ({ value, inputKey, updateObject, rows }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    value !== newValue && updateObject(inputKey, newValue);
  };

  return (
    <textarea
      className='common-textarea'
      value={inputValue}
      onChange={handleOnChange}
      rows={rows || 3}
    />
  );
};

export default CommonTextArea;
