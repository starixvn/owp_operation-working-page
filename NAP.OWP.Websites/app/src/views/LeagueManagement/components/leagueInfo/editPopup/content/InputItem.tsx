import React from 'react';

interface InputItemProps {
  label: string;
}
export const InputItem: React.FC<InputItemProps> = ({ label }) => {
  return (
    <div className='input-item'>
      <div className='label'>{label}</div>
      <input className='input' />
    </div>
  );
};
