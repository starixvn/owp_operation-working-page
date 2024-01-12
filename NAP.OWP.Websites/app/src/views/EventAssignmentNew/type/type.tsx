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
  oWPMatchId: number,
  parentMatchId: number,
  matchStatus: string,
  infoSiteMatchId: null | number,
  isInfoSiteLinked: boolean,
  isLiveStatusSynchronized: boolean,
  isShowAbsenceIcon: boolean,
  matchNo: string | null,
  kickOffTime: string,
  kickOffTimeStr: string,
  infoSiteTime: string | null,
  infoSiteTimeDisplay: string | null
  otherTime: string,
  otherTimeStr: string,
  home: string,
  away: string,
  league: string,
  leagueGroup: string | null,
  noOfHDP: string | null,
  matchOffers: Array<{
    id: number,
    OWPMatchId: number,
    matchOfferValue: string
  }>
}>
type TQueryLiveGameAssignment = {
  loadingDataTable: string;
  dataTable: TDataTable,
  queryDataTable(): Promise<void>
};

type TQueryPolicy = {
  loadingPolicy: string,
  policy: {
    FullBetTypes: {
      HasWrite: boolean
    },
    PHBetTypes: {
      HasWrite: boolean
    },
    detailInformationPolicy: {
      HasRead: boolean,
      HasWrite: boolean
    }
  },
  queryPolicy(): Promise<void>
}

export {
  TDataTable,
  TQueryLiveGameAssignment,
  TColumn,
  TPickCellModel,
  TCellModel,
  TQueryPolicy
};