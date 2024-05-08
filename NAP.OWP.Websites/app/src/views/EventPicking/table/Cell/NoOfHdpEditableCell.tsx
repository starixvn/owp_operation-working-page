import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setValueNoOfHdp } from '../eventPickingTableSlice/reducer';
import { uniqueId } from 'lodash';

const NoOfHdpEditableCell = ({
  value,
  infoSiteMatchId
}: {
  value: string | null | undefined,
  infoSiteMatchId: number
}) => {
  console.log(value);
  let newValue = null;
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleBlur = () => {

    dispatch(setValueNoOfHdp({
      value: inputRef?.current?.value,
      infoSiteMatchId
    }));
  };

  useEffect(() => {
    return () => {
      if (newValue !== null) {
        dispatch(setValueNoOfHdp({
          value: newValue,
          infoSiteMatchId
        }));
        newValue = null;
      }
    };
  });
  return (
    <div key={uniqueId()} className="input-value no__hdp__wrapper">
      <div className='no__hdp__child'>

      </div>
      <input
        ref={inputRef}
        type='text'
        name='noOfHdp'
        className='no__hdp input-field'
        defaultValue={value ?? ''}
        maxLength={2000}
        onBlur={handleBlur}
        onChange={v => { newValue = v.target?.value; }}
      />
      {!value && <a className='mb__check' href='http://google.com'>
        Check
      </a>}
    </div>
  );
};


export default NoOfHdpEditableCell;