type TDataTable = {
  tV: string;
  ipTv: string;
  channel: string;
  wb: string;
  eventDateTime: Date;
  leagueName: string;
  matchOffer: string;
  noHDP: string;
  homeName: string;
  awayName: string;
  maxBetHDP: number;
  isNoOffer: boolean;
  infoSiteMatchId: number;
  isChildMatch: boolean;
  childMatchId: number;
  otherProvider: string;
  agent: string;
  venue: string;
  provider: string;
  lstNote: string;
  remark: string;
  remark2: string;
  homeRemark: string;
  awayRemark: string;
  division: string;
  round: string;
  eTPK: string;
  isCheck: boolean;
  rowColor: string;
  turnoverPeriod: TTurnOverInfo[];
  marginPeriod: MarginInfo[];
};

type TTurnOverInfo = {
  title: string;
  valueDisplay: string;
  value: number;
  color: string;
};

type MarginInfo = {
  title: string;
  valueDisplay: string;
  value: number;
  color: string;
};

type TTableSlice = {
  entities: Array<TDataTable>;
  entitiesOriginal: Array<TDataTable>;
  isNoOfferAll: boolean;
  isConfirmAll: boolean;
  valueFilterAllColumn: FilterAllColumn;
  columnKeyFilterCurrent: string;
  filterState: Array<TFilterState>;
  sortState: ISortState;
  loading: string;
};

type TFilterState = {
  columnKey: string | undefined;
  keyword: string | undefined;
};

interface FilterAllColumn {
  [x: string]: string;
}

type TPermission = {
  UserName: string;
  HasRead: boolean;
  HasWrite: boolean;
  ActorId: number;
  SiteId: number;
};

interface ISortState {
  columnKeySelected: Required<string>;
  orderType: string;
}

export default TDataTable;
export {
  TTurnOverInfo,
  TTableSlice,
  TFilterState,
  FilterAllColumn,
  TPermission,
  ISortState
};
