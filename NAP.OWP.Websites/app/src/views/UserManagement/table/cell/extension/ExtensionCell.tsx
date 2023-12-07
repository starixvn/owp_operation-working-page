import React from 'react';
import CustomInput from '../../../component/CustomInput';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import { updateUserInfo } from '../../../utils';

type Props = {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
};

const ExtensionCell = ({ dataSource, rowIndex }: Props) => {
  const { updateValue } = store.getState();

  const updateInfo = (newValue: string) => {
    updateUserInfo({
      ColumnName: 'Extension',
      UserId: `${dataSource[rowIndex].userId}`,
      Value: newValue
    });

    updateValue(newValue, 'extension', rowIndex);
  };

  return (
    <CustomInput
      value={dataSource[rowIndex].extension}
      handleOnBlur={updateInfo}
    />
  );
};

export default ExtensionCell;
