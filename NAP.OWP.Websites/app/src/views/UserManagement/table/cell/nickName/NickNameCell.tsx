import React from 'react';
import { CellProps } from '../../../type';
import CustomInput from '../../../component/CustomInput';
import Toast from '../../../../components/ToastrWrapper';
import store from '../../../app/useStoreNative';
import { updateUserInfo } from '../../../utils';

const NickNameCell = ({ dataSource, rowIndex }: CellProps) => {
  const { updateValue } = store.getState();
  const { nickName, userId } = dataSource[rowIndex];

  const updateInfo = async (newValue: string) => {
    if (/\s/.test(newValue)) {
      return Toast.showError('Nickname cannot contain a space');
    }
    const response = await updateUserInfo({
      ColumnName: 'NickName',
      UserId: `${userId}`,
      Value: newValue
    });

    return response.errCode
      ? Toast.showError(response.errMsg)
      : updateValue(newValue, 'nickName', rowIndex);
  };

  return <CustomInput value={nickName} handleOnBlur={updateInfo} />;
};

export default NickNameCell;
