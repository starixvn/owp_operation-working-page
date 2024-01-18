type TColumn = {
  HEADER_NAME: string;
  COLUMN_KEY: string;
  IS_CAN_FILTER: boolean;
  WIDTH: number;
};

type TPickCellModel = {
  dataSource: TDataTable;
  columnKey: string;
  handleShowTicket: (show: any) => void;
};

type TNoteCell = TCellModel & {
  onShowNote: (show: any) => void;
};

type TCellModel = {
  dataSource: TDataTable;
  rowIndex: number;
};

type TAssignment = {
  assignmentId: number | null;
  assignmentNote: string | null;
  assignmentType: number;
  oWPMatchId: number;
  parentMatchId: number;
  bettype: number;
  minorBettypeId: number | null;
  userId: number;
  username: string;
};
type TDataSource = {
  isFantasy: boolean;
  minorBettypeId: number;
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
  Notes: Array<TNote>;
  handicap: Array<TAssignment>;
  handicap1st: Array<TAssignment>;
  overUnder: Array<TAssignment>;
  overUnder1st: Array<TAssignment>;
  oneXTwo: Array<TAssignment>;
  oneXTwo1st: Array<TAssignment>;
  specific15Mins: Array<TAssignment>;
  specific10Mins: Array<TAssignment>;
  fM: Array<TAssignment>;
  aIO: Array<TAssignment>;
  lA: Array<TAssignment>;
};

type TDataTable = Array<TDataSource>;
type TNote = {
  LastUpdated: string;
  MatchNoteId: number;
  Note: string;
  OWPMatchId: number;
  UserId: number;
  Username: string;
};
type TQueryLiveGameAssignment = {
  filterState: Array<TColumnFilter>,
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
  Note: {
    HasRead: boolean;
    HasWrite: boolean;
  };
};

type TBettype =
  | 'handicap'
  | 'handicap1st'
  | 'overUnder'
  | 'overUnder1st'
  | 'oneXTwo'
  | 'oneXTwo1st'
  | 'specific15Mins'
  | 'specific10Mins'
  | 'fM'
  | 'aIO'
  | 'lA';

type TAssignmentBuilder = {
  data: TDataTable;
  rowIndex: number;
  bettypeName: TBettype;
  policy: TPolicy;
  onSavedAssignment: () => void;
  onDeletedAssignment: () => void;
};

type TUpdateAssignment = {
  assignment: TAssignment;
  bettypeName: TBettype;
  rowIndex: number;
};

type TColumnFilter = {
  keyword: string;
  columnKey: string;
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

type TMainAssignment = TAssignment | undefined | { oWPMatchId: number };
type TOthersAssignment = TAssignment[] | undefined;
export {
  TDataSource,
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
  CreatorInfo,
  TAssignmentBuilder,
  TBettype,
  TNoteCell,
  TNote,
  TAssignment,
  TMainAssignment,
  TOthersAssignment,
  TUpdateAssignment,
  TColumnFilter
};
