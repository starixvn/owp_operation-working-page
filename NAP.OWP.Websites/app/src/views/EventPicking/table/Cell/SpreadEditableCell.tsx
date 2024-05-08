import { createRef, useEffect } from 'react';
import NumericTextbox from 'react-numeric-textbox';
import { useAppDispatch } from '../../app/hooks';
import { setValueMaxbetSpread } from '../eventPickingTableSlice/reducer';

const SpreadEditableCell = ({ spread, spreadKey, infoSiteMatchId }: {
  spread: number | string | undefined,
  spreadKey: 'maxbetHdp' | 'spreadOu' | 'spreadHdp',
  infoSiteMatchId: number
}) => {
  let newValue = -999999999;
  const dispatch = useAppDispatch();
  const inputRef = createRef<HTMLInputElement>();
  const handleBlur = () => {
    if (inputRef?.current) {

      const { value } = inputRef.current;
      typeof value === 'number' && dispatch(setValueMaxbetSpread({
        value: (value as number) / 100,
        key: spreadKey,
        infoSiteMatchId
      }));
    }

  };

  useEffect(() => {
    return () => {
      if (newValue !== -999999999) {
        dispatch(setValueMaxbetSpread({
          value: newValue / 100,
          key: spreadKey,
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
          value={spread}
          min={0}
          max={99}
          decimals={2}
          autoCorrect
          format=''
          onBlur={handleBlur}
          onChange={v => {
            newValue = v as number;
          }}
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