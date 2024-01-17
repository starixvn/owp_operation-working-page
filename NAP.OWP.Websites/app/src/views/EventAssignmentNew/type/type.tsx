type TColumn = {
  HEADER_NAME: string;
  COLUMN_KEY: string;
  IS_CAN_FILTER: boolean;
  WIDTH: number;
};

type TPickCellModel = {
  dataSource: TDataTable;
  columnKey: string;
};

type TCellModel = {
  dataSource: TDataTable;
  rowIndex: number;
  notePolicy?: object;
  onShowNote?: (show: any) => void;
  closePopup?: boolean;
};

type TDataTable = Array<{
  isFantasy: boolean;
  minorBettypeId: number | null | undefined;
  matchCode: JSX.Element;
  noOfHDPId: any;
  adminSiteId: number | null;
  iPTVCopy: string;
  provider: string;
  AdminSiteId: number;
  oWPMatchId: number;
  parentMatchId: number;
  matchStatus: string;
  infoSiteMatchId: null | number;
  isInfoSiteLinked: boolean;
  isLiveStatusSynchronized: boolean;
  isShowAbsenceIcon: boolean;
  matchNo: string | null;
  kickOffTime: string;
  kickOffTimeStr: string;
  infoSiteTime: string | null;
  infoSiteTimeDisplay: string | null;
  otherTime: string;
  otherTimeStr: string;
  home: string;
  away: string;
  league: string;
  leagueGroup: string | null;
  noOfHDP: string | null;
  isAllowedToViewDetail: boolean;
  matchOffers: Array<{
    id: number;
    OWPMatchId: number;
    matchOfferValue: string;
  }>;
}>;
type TQueryLiveGameAssignment = {
  loading: string;
  entities: TDataTable;
};

type TPolicy = {
  UserId: number;
  Username: string;
  FullBetTypes: {
    HasWrite: boolean;
  };
  PHBetTypes: {
    HasWrite: boolean;
  };
  detailInformationPolicy: {
    HasRead: boolean;
    HasWrite: boolean;
  };
  EventPicking: {
    HasRead: boolean;
    HasWrite: boolean;
  };
  dailyWorkingShiftPolicy: {
    HasRead: boolean;
    HasWrite: boolean;
  };
  MyTicket: {
    HasRead: boolean;
    HasWrite: boolean;
  };
};

type TFilterQueryOptions = {
  MatchStatus: TMatchStatus;
  OffVR: TMatchOffer;
};

type TMatchStatus = {
  RefName: string;
  Value: string;
};

type TMatchOffer = {
  Id: number;
  RefName: string;
  Value: string;
};

type TQueryPolicy = {
  loading: string;
  entities: TPolicy;
};

type TFilter = {
  selectedDate: Date;
  userNameFilter: string;
  userNameFilterIsValid: boolean;
  selectedMatchType: TOptions[];
  selectedMatchStatus: TOptions[];
  selectedSyncLive: TOptions;
  selectedOffVRs: TOptions[];
  showUnreadMessage: boolean;
};

type TOptions = {
  label: string;
  value: string | number;
};

type TTicketCell = TCellModel & {
  onShowTicketList: () => void;
  updateDataSources: () => void;
};
type CreatorInfo = {
  groupName: null | string;
  nickName: null | string;
  recipientId: number;
  recipientType: number;
  userName: string;
};
export {
  TOptions,
  TFilterQueryOptions,
  TMatchOffer,
  TDataTable,
  TQueryLiveGameAssignment,
  TColumn,
  TPickCellModel,
  TCellModel,
  TQueryPolicy,
  TFilter,
  TPolicy,
  TTicketCell,
  CreatorInfo
};
