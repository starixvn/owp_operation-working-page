import React from 'react';
import { TUserInfo } from '../../../type';
import CustomInput from '../../../component/CustomInput';

const AddressCell = (props: {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
}) => {
  const { dataSource, rowIndex } = props;
  const user = dataSource[rowIndex];

  return (
    <CustomInput
      value={user.address}
      handleOnChange={() => { }}
      handleOnBlur={() => { }} />
  );
};

export default AddressCell;