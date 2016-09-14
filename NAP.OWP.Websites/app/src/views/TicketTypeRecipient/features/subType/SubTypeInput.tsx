import React, { useState } from 'react';
import { SubType } from '../TypeNative';

type Prop = {
  onAddNew: (subType: SubType) => void;
};

const SubTypeInput = (props: Prop) => {
  const { onAddNew } = props;
  const [value, setValue] = useState<string>('');

  const handleSubmit = () => {
    value &&
      onAddNew({
        subtypeId: 0,
        typeId: 0,
        subtypeName: value
      });
    setValue('');
  };

  return (
    <div className='new-subtype'>
      <label>Subtype:</label>
      <input
        className='subtype-text-input'
        type='text'
        placeholder='Add subtype'
        value={value}
        maxLength={100}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={handleSubmit} className='button button-add'>
        Add
      </button>
    </div>
  );
};

export default SubTypeInput;
