
import { createRef } from 'react';
import NumericTextbox from 'react-numeric-textbox';

const MaxbetEditableCell = ({ value }: { value: string | number | undefined }) => {
  const input = createRef();
  const handleBlur = () => {

  };
  return (
    <div className='input-value'>
      <NumericTextbox
        ref={input}
        className='input-field'
        value={value}
        min={0}
        max={999999}
        decimals={3}
        autoCorrect
        format=''
        name='maxbet'
        onBlur={handleBlur}
      />
      <span>K</span>
    </div>
  );
};


export default MaxbetEditableCell;