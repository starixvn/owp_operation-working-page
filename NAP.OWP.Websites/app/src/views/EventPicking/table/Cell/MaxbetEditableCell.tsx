
import { createRef, useEffect } from 'react';
import NumericTextbox from 'react-numeric-textbox';
import { useAppDispatch } from '../../app/hooks';
import { setValueMaxbetSpread } from '../eventPickingTableSlice/reducer';

const MaxbetEditableCell = ({ value, infoSiteMatchId }: { value: string | number | undefined, infoSiteMatchId: number }) => {
  let newValue = -999999999;
  const dispatch = useAppDispatch();
  const inputRef = createRef<HTMLInputElement>();
  const handleBlur = () => {
    dispatch(setValueMaxbetSpread({
      value: (inputRef?.current?.value as number) * 1000,
      key: 'maxbetHdp',
      infoSiteMatchId
    }));
  };

  useEffect(() => {
    return () => {
      if (newValue !== -999999999) {
        dispatch(setValueMaxbetSpread({
          value: newValue * 1000,
          key: 'maxbetHdp',
          infoSiteMatchId
        }));
        newValue = -999999999;
      }
    };
  });

  return (
    <>
      <div className='input-value'>
        <NumericTextbox
          ref={inputRef}
          className='input-field'
          value={value ?? undefined}
          min={0}
          max={999999}
          decimals={3}
          autoCorrect
          format=''
          name='maxbet'
          onBlur={handleBlur}
          onChange={v => {
            newValue = v;
          }}
        />
        <span>K</span>
      </div>
      {!value && <a className='mb__check' href='http://google.com'>
        Check
      </a>}
    </>
  );
};


export default MaxbetEditableCell;