import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import { hasPermissionUser, updateUserInfo } from '../../../utils';

const GroupCell = (props: {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
}) => {
  const { options, updateValue } = store.getState();
  const { userGroups } = options;
  const { rowIndex, dataSource } = props;
  const { groupId, userId, sectionName } = dataSource[rowIndex];

  const handleOnchangeOptions = (value: string) => {
    updateUserInfo({
      ColumnName: "GroupId",
      UserId: `${userId}`,
      Value: value !== '0' ? value : ''
    });
    updateValue(parseInt(value), 'groupId', rowIndex);
  };

  const renderOptions = (startIndex: number, endIndex: number) => {
    const options = [];
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
        disabled={!hasPermissionUser(sectionName)}
        value={groupId ?? 0}
        onChange={e => handleOnchangeOptions(e.target.value)}
        className='browser-default'>
        <option value={0}></option>
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
