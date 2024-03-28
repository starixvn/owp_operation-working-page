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

type MultipleFilterHeaderProps = {
  columnKey: string
  options: Option[];
  selected: Option[];
  isFilter: boolean;
  onFilter: (selected: Option[]) => void;
};

type MultipleFilterPopupProps = Omit<MultipleFilterHeaderProps, 'columnKey'> & {
  onClosedPopup: () => void;
};

export { TFilterState, TFilterHeaderProps, MultipleFilterPopupProps, MultipleFilterHeaderProps };
