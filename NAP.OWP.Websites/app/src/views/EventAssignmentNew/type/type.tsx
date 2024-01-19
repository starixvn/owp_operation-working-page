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
  AssignmentId: number | null;
  AssignmentNote: string | null;
  AssignmentType: number;
  OWPMatchId: number;
  ParentMatchId: number;
  Bettype: number;
  MinorBettypeId: number | null;
  UserId: number;
  Username: string;
};

type TDataSource = {
  Channel: boolean;
  Phone: string;
  WatchBet: string;
  OtherProvider: string;
  Round: string;
  Division: string;
  TeamRound: string;
  Remark: string;
  IsFantasy: boolean;
  MinorBettypeId: number;
  MatchCode: string;
  NoOfHDPId: number | null;
  AdminSiteId: number | null;
  IPTVCopy: string;
  Provider: string;
  OWPMatchId: number;
  ParentMatchId: number;
  MatchStatus: string;
  InfoSiteMatchId: null | number;
  IsInfoSiteLinked: boolean;
  IsLiveStatusSynchronized: boolean;
  IsShowAbsenceIcon: boolean;
  MatchNo: string | null;
  KickOffTime: string;
  KickOffTimeStr: string;
  InfoSiteTime: string | null;
  InfoSiteTimeDisplay: string | null;
  OtherTime: string;
  OtherTimeStr: string;
  Home: string;
  Away: string;
  League: string;
  LeagueGroup: string | null;
  NoOfHDP: string | null;
  IsAllowedToViewDetail: boolean;
  MatchOffers: Array<{
    Id: number;
    OWPMatchId: number;
    MatchOfferValue: string;
  }>;
  Notes: Array<TNote>;
  Handicap: Array<TAssignment>;
  Handicap1st: Array<TAssignment>;
  OverUnder: Array<TAssignment>;
  OverUnder1st: Array<TAssignment>;
  OneXTwo: Array<TAssignment>;
  OneXTwo1st: Array<TAssignment>;
  Specific15Mins: Array<TAssignment>;
  Specific10Mins: Array<TAssignment>;
  FM: Array<TAssignment>;
  AIO: Array<TAssignment>;
  LA: Array<TAssignment>;
  HandicapSetting: TMaxbetSpread;
  OverUnderSetting: TMaxbetSpread;
  Televisions: Array<{
    TVCode: string;
    Color: string;
  }>;
};
type TColumnFilterByMbc = {
  maxbetHDP: number | string;
  spreadHDP: number | string;
  spreadOU: number | string;
  maxBetToDisplay: string;
  keyword: string;
};
type TMaxbetSpread = {
  Maxbet: number;
  Spread: number;
  MaxBetToDisplay: string;
  spreadToDisplay: string;
};
type TDataTable = Array<TDataSource>;
type TQueryData = {
  data: TDataTable;
  dateUpdated: string;
  syncOffVRLastUpdated: {
    item1: string;
    item2: string;
  };
};
type TNote = {
  LastUpdated: string;
  MatchNoteId: number;
  Note: string;
  OWPMatchId: number;
  UserId: number;
  Username: string;
};
type TQueryLiveGameAssignment = {
  dateUpdated: string;
  syncOffVRLastTime: string;
  syncOffVRByUser: string;
  filterState: Array<TColumnFilter>;
  loading: string;
  entities: TDataTable;
  entitiesOriginal: TDataTable;
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
  dataSource: TDataTable;
  rowIndex: number;
  bettypeName: TBettype;
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
  TQueryData,
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
  TColumnFilter,
  TColumnFilterByMbc,
  TMaxbetSpread
};
