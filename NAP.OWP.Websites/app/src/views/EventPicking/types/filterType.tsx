import { IMultipleSelectProps } from "../../Shared/MultipleSelection/type";

type TCommonFilterInfo = Date | (number | string | null)[];
type TFilter = {
  [x: string]: TCommonFilterInfo
};

type TProviderSelectionTemplate = {
  label: Required<string>,
  filterKey: Required<string>
};

type TPayloadFilter = {
  key: Required<string>,
  value: TCommonFilterInfo
};

type TMultipleSelectionTemplate = IMultipleSelectProps & {
  filterKey: Required<string>
};

export {
  TFilter,
  TPayloadFilter,
  TMultipleSelectionTemplate,
  TProviderSelectionTemplate
};
