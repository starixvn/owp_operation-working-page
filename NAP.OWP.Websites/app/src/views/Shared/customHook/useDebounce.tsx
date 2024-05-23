import React from 'react';

const useDebounce = (props:{
  invoke: (value: any) => void
  value: any
}) => {
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.invoke(value);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [props.inputValue, 500]);
};

useDebounce.propTypes = {
  
};

export default useDebounce;