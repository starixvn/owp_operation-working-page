type TEditableKey = 'Agent' | 'EstNote';
type TMaxbetSetting = {
  [key in 'HandicapSetting' | 'OverUnderSetting']: {
    MaxBet: number | undefined,
    MaxBetToDisplay: string | undefined,
    Spread: number | undefined,
    SpreadToDisplay: string | undefined,
  }
}
type TDataSource = {
  [key in 'Provider' | 'OtherProvider' | 'Remark' | 'RemarkBy']: string | null;
} & {
    [key in 'MatchNo' | 'MatchStatus' | 'EventDateTime' | 'League' | 'Home' |
    'Away'
    ]: Required<string>
  } & TTicketCell & {
    AgentConfirm: {
      Value: number | string | null;
      Label: string;
      Key?: string;
      Disabled?: boolean;
    }[]
  } & {
    [key in TEditableKey]: string | undefined;
  } & TMaxbetSetting

type TCommonCell = {
  className: string | undefined,
  value: string | null
};

type TEditableCell = {
  className: string | undefined,
  value: string | undefined,
  onBlur: (value: string | undefined) => void
}

type TTicketCell = {
  [key in 'HasTicket' | 'IsRead']: boolean
} & { rowIndex: number }

type TUpdateRow = {
  rowIndex: Required<number>,
  key: TEditableKey,
  value: string | undefined
}
export {
  TDataSource,
  TCommonCell,
  TTicketCell,
  TEditableCell,
  TEditableKey,
  TUpdateRow,
  TMaxbetSetting
};
