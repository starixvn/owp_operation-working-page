import React, { useRef } from 'react';

type Props = {
  value: string | null;
  handleOnChange: (newValue: string) => void;
  handleOnBlur: () => void;
};

const CustomInput = ({ value, handleOnChange, handleOnBlur }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleOnBlur();
      inputRef.current?.blur();
    }
  };

  return (
    <div>
      <input
        type='text'
        value={value ?? ''}
        onChange={e => handleOnChange(e.target.value)}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyPress}
        style={{ display: 'block' }}
        ref={inputRef}
      />
    </div>
  );
};

export default CustomInput;
