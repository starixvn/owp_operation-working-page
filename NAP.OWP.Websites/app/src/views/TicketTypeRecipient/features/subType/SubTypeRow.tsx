import { isEqual } from 'lodash';
import React, { useState } from 'react';
import { SubType } from '../TypeNative';

type Prop = {
  index: number;
  onUpdateSubType: (value: Required<string>, index: number) => void
} & SubType;


const SubTypeRow = (props: Prop) => {
  const {
    subtypeName,
    index,
    onUpdateSubType
  } = props;

  const [value, setValue] = useState(subtypeName);

  const handleBlur = () => {
    !isEqual(value, subtypeName) &&
      onUpdateSubType(value, index);
  };

  return (
    <div className='control-subtype'>
      <input
        className='subtype-text-input'
        type='text'
        value={value}
        maxLength={100}
        onBlur={handleBlur}
        onChange={e => setValue(e.target.value)}
      />
      {!value && <span
        className='subtype-error'>This field is required</span>}
    </div>
  );
};

export default SubTypeRow;