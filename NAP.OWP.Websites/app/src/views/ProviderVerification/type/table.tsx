import { Option } from "../../Shared/MultipleSelection/type";

type TEditableKey = 'Agent' | 'EstNote';
type TAgentConfirm = {
  Value: number | string | null;
  Label: string;
  Key?: string;
  Disabled?: boolean;
};

type TMaxbetSetting = {
  [key in 'HandicapSetting' | 'OverUnderSetting']: {
    MaxBet: number | undefined;
    MaxBetToDisplay: string | undefined;
    Spread: number | undefined;
    SpreadToDisplay: string | undefined;
  };
};
type TDataSource = {
  [key in 'Provider' | 'OtherProvider' | 'Remark' | 'RemarkBy']: string | null;
} & {
  OWPMatchId: number;
  ParentMatchId: number;
} & {
    [key in
    | 'MatchNo'
    | 'MatchStatus'
    | 'EventDateTime'
    | 'League'
    | 'Home'
    | 'Away']: Required<string>;
  } & TTicketCell & {
    AgentConfirm: TAgentConfirm[];
  } & {
    [key in TEditableKey]: string | undefined;
  } & TMaxbetSetting;

type TCommonCell = {
  className: string | undefined;
  value: string | null;
};

type TEditableCell = {
  className: string | undefined;
  value: string | undefined;
  onBlur: (value: string | undefined) => void;
};

type TTicketCell = {
  [key in 'HasTicket' | 'IsRead']: boolean;
} & { rowIndex: number; dataSource: TDataSource };

type TUpdateRow = {
  rowIndex: Required<number>;
  key: TEditableKey;
  value: string | undefined;
};

type TUpdateAgentConfirm = { value: TAgentConfirm[] } & { rowIndex: number } & {
  nickName: null | string;
  recipientId: number;
  recipientType: number;
  userName: string;
};

type TColumnKey = "matchNo"
  | "matchStatus" |
  "koTime" |
  "league" |
  "match" |
  "runner" |
  "agent" |
  "mb" |
  "remark" |
  "remarkBy" |
  "agentConfirm"
  | "estNote"
  | "otherProvider";

type TMultipleColumnFilterOption = {
  [key in TColumnKey]: Option[];
};

type TMultipleFilter = {
  [key in TColumnKey]: {
    isFilter: boolean;
    selected: Option[];
    options: Option[];
  };
};

export {
  TDataSource,
  TCommonCell,
  TTicketCell,
  TEditableCell,
  TEditableKey,
  TUpdateRow,
  TMaxbetSetting,
  TAgentConfirm,
  TUpdateAgentConfirm,
  TMultipleColumnFilterOption,
  TMultipleFilter,
  TColumnKey
};
