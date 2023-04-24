type TMatchInfo = {
  owpMatchId: number;
  leagueName: string;
  homeName: string;
  awayName: string;
  koTime: Date;
  eventDate: Date;
  matchNo: number;
  maxbetHDP: number;
  maxbetHDPInString: string;
  bettypeName: string;
  filterDate: Date;
};

type Header = {
  id: string;
  name: string;
};

type UserInfo = {
  userId: number;
  shift: string;
  username: string;
  isManagementRole: boolean;
  level: string;
  mainBetType: string;
  maxMultipleGames: string;
  explanation: string;
  levelLabel: string;
};

type AssignmentCell = {
  text: string;
  color: string;
  textColor?: string;
};

type TimeLine = {
  title: string;
  id: string;
  width?: number;
  color?: string;
};
type TableCell = {
  index: number;
  value?: string;
};
type UserWorkingSchedule = {
  userInfo?: UserInfo;
  yesterday_02h?: AssignmentCell;
  yesterday_03h?: AssignmentCell;
  yesterday_04h?: AssignmentCell;
  yesterday_05h?: AssignmentCell;
  yesterday_06h?: AssignmentCell;
  yesterday_07h?: AssignmentCell;
  yesterday_08h?: AssignmentCell;
  yesterday_09h?: AssignmentCell;
  yesterday_10h?: AssignmentCell;
  yesterday_11h?: AssignmentCell;
  today_12h?: AssignmentCell;
  today_13h?: AssignmentCell;
  today_14h?: AssignmentCell;
  today_15h?: AssignmentCell;
  today_16h?: AssignmentCell;
  today_17h?: AssignmentCell;
  today_18h?: AssignmentCell;
  today_19h?: AssignmentCell;
  today_20h?: AssignmentCell;
  today_21h?: AssignmentCell;
  today_22h?: AssignmentCell;
  today_23h?: AssignmentCell;
  today_00h?: AssignmentCell;
  today_01h?: AssignmentCell;
  today_02h?: AssignmentCell;
  today_03h?: AssignmentCell;
  today_04h?: AssignmentCell;
  today_05h?: AssignmentCell;
  today_06h?: AssignmentCell;
  today_07h?: AssignmentCell;
  today_08h?: AssignmentCell;
  today_09h?: AssignmentCell;
  today_10h?: AssignmentCell;
  today_11h?: AssignmentCell;
  tomorrow_12h?: AssignmentCell;
  tomorrow_13h?: AssignmentCell;
  tomorrow_14h?: AssignmentCell;
  tomorrow_15h?: AssignmentCell;
  tomorrow_16h?: AssignmentCell;
};

type TAssigneeSuggestion = {
  matchInfo: TMatchInfo;
  fullyAvailable: UserWorkingSchedule[];
  partiallyAvailable: UserWorkingSchedule[];
  busy: UserWorkingSchedule[];
};

type TColorExplain = {
  label: Required<string>;
  backgroundColor: Required<string>;
  textColor: Required<string>;
};

type TQueryColorExplainInfo = {
  colorExplainInfo: TColorExplain[];
  loadingColorExplain: string;
  queryColorExplain: () => Promise<void>;
};

type TQueryWorkScheduleInfo = {
  workScheduleInfo: TAssigneeSuggestion;
  loadingDataTable: string;
  queryDataTable: (params: TQueryWorkScheduleType) => Promise<void>;
};

type TQueryWorkScheduleType = {
  matchId: string | null;
  betTypeId: string | null;
  filterDate: string | null;
};

type TQueryHeaderInfo = {
  loadingHeader: string;
  headerInfo: TMatchInfo;
  queryHeader: (eventDate: Date) => Promise<void>;
};

export {
  TQueryHeaderInfo,
  UserWorkingSchedule,
  AssignmentCell,
  Header,
  UserInfo,
  TQueryWorkScheduleInfo,
  TMatchInfo,
  TableCell,
  TimeLine,
  TQueryColorExplainInfo,
  TColorExplain,
  TAssigneeSuggestion
};
