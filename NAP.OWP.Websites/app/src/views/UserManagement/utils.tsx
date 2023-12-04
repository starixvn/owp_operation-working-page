import { TQueryUserInfo, TRefResource } from "./type";
import { Option } from '../Shared/MultipleSelection/type';
import store from './app/useStoreNative';

const normalizeOptions = (optionsSource: Array<TRefResource>, noneOption: Option) => {
  const options = optionsSource.map(o => ({
    value: o.resourceId,
    label: o.value
  } as Option));
  options.push(noneOption);
  return options;
};

const getValueFilter = (): TQueryUserInfo => {
  const { userName, role, section, department, category, locationCode } = store.getState().filterValue;
  return {
    user: userName,
    roleId: role.map(r => r.value),
    SectionId: section.map(r => r.value),
    DepartmentId: department.map(r => r.value),
    CategoryId: category.map(r => r.value),
    LocationCode: locationCode.map(r => r.value)
  };
};

export {
  normalizeOptions,
  getValueFilter
};
