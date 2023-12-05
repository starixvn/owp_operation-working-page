import React from 'react';
import CustomInput from '../../../component/CustomInput';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';

type Props = {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
};

const ExtensionCell = ({ dataSource, rowIndex }: Props) => {
  const { updateValue } = store.getState();

  const handleOnChange = (newValue: string) => {
    updateValue(newValue, 'extension', rowIndex);
  };

  const updateInfo = () => {
    //api
  };

  return (
    <CustomInput
      value={dataSource[rowIndex].extension}
      handleOnChange={handleOnChange}
      handleOnBlur={updateInfo}
    />
  );
};

export default ExtensionCell;
