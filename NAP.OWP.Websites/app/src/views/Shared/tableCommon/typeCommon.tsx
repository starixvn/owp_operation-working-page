import { Option } from '../MultipleSelection/type';

type TFilterState = {
  columnKey: string | undefined;
  keyword: string | undefined;
};

type TFilterHeaderProps = {
  columnKey: string;
  options: Option[],
  model: any;
  handleClickFilterCallback: (value: string) => void;
  handleClearFilterCallback: () => void;
  handleFilterBySearchKeyCallback: (filterState: TFilterState) => void;
  handleValueFilterCallback: (filterState: TFilterState) => void;
};

export { TFilterState, TFilterHeaderProps };
