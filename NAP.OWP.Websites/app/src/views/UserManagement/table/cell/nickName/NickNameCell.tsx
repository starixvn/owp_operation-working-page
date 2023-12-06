import React from 'react';
import { CellProps } from '../../../type';
import CustomInput from '../../../component/CustomInput';
import store from '../../../app/useStoreNative';
import Toast from '../../../../components/ToastrWrapper';

const NickNameCell = ({ dataSource, rowIndex }: CellProps) => {
  const { updateValue } = store.getState();

  const handleOnChange = (newValue: string) => {
    updateValue(newValue, 'nickName', rowIndex);
  };

  const updateInfo = () => {
    if (/\s/.test(dataSource[rowIndex]?.nickName)) {
      return Toast.showError('Nickname cannot contain a space');
    }
  };

  return (
    <CustomInput
      value={dataSource[rowIndex]?.nickName}
      handleOnChange={handleOnChange}
      handleOnBlur={updateInfo}
    />
  );
};

export default NickNameCell;
