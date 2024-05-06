import { createRef } from 'react';
import NumericTextbox from 'react-numeric-textbox';

const SpreadEditableCell = ({ spread }: { spread: number | string | undefined }) => {
  const input = createRef();
  const handleBlur = () => {

  };
  return (
    <>
      <div className='input-value'>
        <NumericTextbox
          ref={input}
          className='input-field'
          value={spread}
          min={0}
          max={99}
          decimals={2}
          autoCorrect
          format=''
          onBlur={handleBlur}
        />
        <span>%</span>
      </div>
      {!spread && <a className='mb__check' href='http://google.com'>
        Check
      </a>}
    </>
  );
};

export default SpreadEditableCell;