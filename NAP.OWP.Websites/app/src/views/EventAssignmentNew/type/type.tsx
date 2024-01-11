type TColumn = {
  HEADER_NAME: string,
  COLUMN_KEY: string,
  IS_CAN_FILTER: boolean
  WIDTH: number
};

type TPickCellModel = {
  dataSource: TDataTable,
  columnKey: string
};

type TCellModel = {
  dataSource: TDataTable,
  rowIndex: number,
};

type TDataTable = Array<{
  matchNo: string,
  KickOffTime: string,
  KickOffTimeStr: Date,
  OtherTime: string,
  OtherTimeStr: Date,
  home: string,
  away: string,
  league: string,
  leagueGroup: string,
  noOfHDP: string,
  matchOffers: Array<{
    id: number,
    OWPMatchId: string,
    matchOfferValue: string
  }>
}>
type TQueryLiveGameAssignment = {
  loadingDataTable: string;
  dataTable: TDataTable,
  queryDataTable(): Promise<void>

}
export {
  TDataTable,
  TQueryLiveGameAssignment,
  TColumn,
  TPickCellModel,
  TCellModel
};