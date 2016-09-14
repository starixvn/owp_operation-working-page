import React from 'react';

const generateButton = buttonProps => {
  const {
    title,
    ...rest
  } = buttonProps;
  return (
    <button
      {...rest}>
      {title}
    </button>
  );
};

export {
  generateButton
};
