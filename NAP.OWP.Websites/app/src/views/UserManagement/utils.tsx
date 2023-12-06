import {
  TDataResponse,
  TQueryUserInfo,
  TRefResource,
  TUpdateUserInfo
} from './type';
import { Option } from '../Shared/MultipleSelection/type';
import store from './app/useStoreNative';
import { post } from '../Shared/Service/Service';

const normalizeOptions = (
  optionsSource: Array<TRefResource>,
  noneOption: Option
) => {
  const options = optionsSource.map(
    o =>
      ({
        value: o.resourceId,
        label: o.value
      } as Option)
  );
  options.push(noneOption);
  return options;
};

const normalizeLocationCodeOptions = (
  optionsSource: Array<TRefResource>,
  noneOption: Option
) => {
  const options = optionsSource.map(
    o =>
      ({
        value: o.value,
        label: o.value
      } as Option)
  );
  options.push(noneOption);
  return options;
};

const getValueFilter = (): TQueryUserInfo => {
  const { userName, role, section, department, category, locationCode } =
    store.getState().filterValue;
  return {
    user: userName,
    roleId: role.map(r => r.value).join(','),
    sectionId: section.map(r => r.value).join(','),
    departmentId: department.map(r => r.value).join(','),
    categoryId: category.map(r => r.value).join(','),
    locationCode: locationCode.map(r => r.value).join(',')
  };
};

const urlExport =
  process.env.NODE_ENV === 'development'
    ? `api-netcore/UserManagement/export-excel`
    : `${window.netCoreRootUrl}/api/UserManagement/export-excel`;

const updateUserInfo = async (updateInfo: TUpdateUserInfo) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? `api-netcore/UserManagement/update-user-info`
      : `${window.netCoreRootUrl}/api/UserManagement/update-user-info`;

  return (
    await post({
      url,
      ...updateInfo
    })
  ).data as TDataResponse;
};

export {
  normalizeOptions,
  normalizeLocationCodeOptions,
  getValueFilter,
  urlExport,
  updateUserInfo
};
