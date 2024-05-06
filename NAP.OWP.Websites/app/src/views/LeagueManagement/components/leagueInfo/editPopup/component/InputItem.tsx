import React, { useEffect, useState } from 'react';
import { TEditSetting } from '../EditType';

interface InputItemProps {
  label: string;
  inputKey: keyof TEditSetting;
  value: string,
  updateObject: Function;
}
export const InputItem: React.FC<InputItemProps> = ({ label, inputKey, value, updateObject }) => {
  console.log("re-render", inputKey);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    newValue !== value && updateObject(inputKey, newValue);
  };

  return (
    <div className='input-item'>
      <div className='label'>{label}</div>
      <input
        value={inputValue}
        className='input'
        onChange={handleOnChange}
        style={{ maxHeight: '2em', overflow: 'hidden' }}
      />
    </div>
  );
};
