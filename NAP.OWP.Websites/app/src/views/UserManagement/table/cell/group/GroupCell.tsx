import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';

const GroupCell = (props: {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
}) => {
  const { options, updateValue } = store.getState();
  const { userGroups } = options;
  const { rowIndex, dataSource } = props;
  const { groupId } = dataSource[rowIndex];

  const renderOptions = (startIndex: number, endIndex: number) => {
    let options = [];
    for (let i = startIndex; i <= endIndex; i++) {
      options.push(
        <option
          key={userGroups[i]?.value}
          value={userGroups[i]?.value ?? undefined}>
          {userGroups[i]?.label}
        </option>
      );
    }
    return options;
  };
  const renderCTISupervisor = () => renderOptions(0, 1);
  const renderCTIStaff = () => renderOptions(2, 3);
  const renderSMSSupervisor = () => renderOptions(4, 9);
  const renderSMSStaff = () => renderOptions(10, 14);
  const renderOther = () => renderOptions(15, userGroups.length - 1);
  return (
    <div className='select-wrapper-default'>
      <select
        disabled={false}
        defaultValue={groupId ?? undefined}
        onChange={e => console.log(e.target.value)}
        className='browser-default'>
        <option value=''></option>
        <optgroup label='CTI LA - Supervisor/Leader'>
          {renderCTISupervisor()}
        </optgroup>
        <optgroup label='CTI LA - Staff'>{renderCTIStaff()}</optgroup>
        <optgroup label='SMS LA - Supervisor/Leader'>
          {renderSMSSupervisor()}
        </optgroup>
        <optgroup label='SMS LA - Staff'>{renderSMSStaff()}</optgroup>
        <optgroup label='Others'>{renderOther()}</optgroup>
      </select>
    </div>
  );
};

export default GroupCell;
