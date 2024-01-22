import { IMultipleSelectProps } from '../../Shared/MultipleSelection/type';

type TCommonFilterInfo = string | (number | string | null)[];
type TFilter = {
  [x: string]: TCommonFilterInfo;
};

type TProviderSelectionTemplate = {
  label: Required<string>;
  filterKey: Required<string>;
};

type TPayloadFilter = {
  key: Required<string>;
  value: TCommonFilterInfo;
};

type TMultipleSelectionTemplate = IMultipleSelectProps & {
  filterKey: Required<string>;
};
type TurnoverMarginSelection = {
  key: string;
  value: number;
};

export {
  TurnoverMarginSelection,
  TFilter,
  TPayloadFilter,
  TMultipleSelectionTemplate,
  TProviderSelectionTemplate
};
