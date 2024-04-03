import React, { useEffect } from 'react';
import store from '../app/store';
import { sumProvider } from '../sumProvider/slice/sumProviderSlice';
import { DATE } from '../filterArea/filterConst.json';
import useStableDispatch from '../../Shared/customHook/useStableDispatch';
import Utils from '../../Shared/Utils';
import { useAppSelector } from '../app/hooks';

const SumProviderTable = () => {
  const dispatch = useStableDispatch();
  const { param } = store.getState().filter;
  const entitiesByDate = useAppSelector(
    state => state.eventPickingTable.entitiesByDate
  );
  const sumTable = useAppSelector(state => state.sumProvider.sumTable);

  useEffect(() => {
    dispatch(
      sumProvider({ data: entitiesByDate, date: param[DATE].toString() })
    );
  }, [entitiesByDate]);

  return (
    <table className='sum-provider-table'>
      <thead>
        <th>Time</th>
        <th>Sum</th>
        <th>Sum*</th>
      </thead>
      <tbody>
        {sumTable.length &&
          sumTable.map((x, index) => {
            return (
              <tr key={index}>
                <td>{Utils.formatTime(x.countDate)}</td>
                <td>{x.count}</td>
                {index > 0 && <td className='periodCount'>{x.periodCount}</td>}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default SumProviderTable;
