import { uniqueId } from 'lodash';
import React, { useEffect, useRef } from 'react';

type Props = {
  value: string | null;
  handleOnBlur: (newValue: string) => void;
  isError?: boolean;
};

const CustomInput = ({ value, handleOnBlur, isError = false }: Props) => {
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
        type='text'
        defaultValue={value ?? ''}
        onBlur={e => handleOnBlur(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ display: 'block' }}
        ref={inputRef}
        className={isError ? 'input-error' : ''}
      />
    </div>
  );
};

export default CustomInput;
