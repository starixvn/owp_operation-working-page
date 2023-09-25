import React from 'react';

type Props = {
  handleOnclick: () => void;
};

const Command = ({ handleOnclick }: Props) => {
  return (
    <div className='command'>
      <button className='submit' onClick={handleOnclick}>
        Submit
      </button>
    </div>
  );
};

export default Command;
