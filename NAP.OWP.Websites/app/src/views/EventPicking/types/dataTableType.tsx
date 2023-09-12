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
  confirmed: boolean;
};

type TTableSlice = {
  entities: Array<TDataTable>;
  entitiesOriginal: Array<TDataTable>;
  isNoOfferAll: boolean;
  isConfirmAll: boolean;
  filterState: Array<TFilterState>;
  loading: string;
};

type TFilterState = {
  columnKey: string | undefined;
  keyword: string | undefined;
};
export default TDataTable;
export { TTableSlice, TFilterState };
