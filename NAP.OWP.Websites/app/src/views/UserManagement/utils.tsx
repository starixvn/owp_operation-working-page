import { TRefResource } from "./type";
import { Option } from '../Shared/MultipleSelection/type';

const normalizeOptions = (optionsSource: Array<TRefResource>) =>
  optionsSource.map(o => ({
    value: o.resourceId,
    label: o.value
  } as Option));


export {
  normalizeOptions
};
