import React from 'react';
import CustomInput from '../../../component/CustomInput';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import { isValidEmail, updateUserInfo } from '../../../utils';
import Toast from '../../../../components/ToastrWrapper';
import { isEmpty } from 'lodash';

type Props = {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
};

const EmailCell = ({ dataSource, rowIndex }: Props) => {
  const { updateValue } = store.getState();

  const updateInfo = (newValue: string) => {
    if (isEmpty(newValue)) {
      return;
    }
    if (!isValidEmail(newValue)) {
      Toast.showError('The format email is invalid');
      return;
    }
    updateUserInfo({
      ColumnName: 'Email',
      UserId: `${dataSource[rowIndex].userId}`,
      Value: newValue
    });

    updateValue(newValue, 'email', rowIndex);
  };

  return (
    <CustomInput value={dataSource[rowIndex].email} handleOnBlur={updateInfo} />
  );
};

export default EmailCell;
