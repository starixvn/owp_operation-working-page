import { uniqueId } from 'lodash';
import React, { useRef } from 'react';

type Props = {
  value: string | null;
  handleOnBlur: (newValue: string) => void;
};

const CustomInput = ({ value, handleOnBlur }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current?.blur();
    }
  };

  return (
    <div>
      <input
        key={uniqueId()}
        type='text'
        defaultValue={value ?? ''}
        onBlur={e => handleOnBlur(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ display: 'block' }}
        ref={inputRef}
      />
    </div>
  );
};

export default CustomInput;
