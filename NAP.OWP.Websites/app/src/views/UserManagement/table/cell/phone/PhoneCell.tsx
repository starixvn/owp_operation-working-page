import React from 'react';
import CustomInput from '../../../component/CustomInput';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import { updateUserInfo } from '../../../utils';

type Props = {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
};

const PhoneCell = ({ dataSource, rowIndex }: Props) => {
  const { updateValue } = store.getState();

  const updateInfo = (newValue: string) => {
    updateUserInfo({
      ColumnName: 'Phone',
      UserId: `${dataSource[rowIndex].userId}`,
      Value: newValue
    });

    updateValue(newValue, 'phone', rowIndex);
  };

  return (
    <CustomInput value={dataSource[rowIndex].phone} handleOnBlur={updateInfo} />
  );
};

export default PhoneCell;
