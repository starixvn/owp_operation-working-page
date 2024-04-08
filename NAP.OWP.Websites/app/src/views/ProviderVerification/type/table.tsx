import { Option } from "../../Shared/MultipleSelection/type";

type TEditableKey = 'Agent' | 'EstNote';

type TDataSource = {
  [key in 'Provider' | 'OtherProvider' | 'Maxbet' | 'Remark' | 'RemarkBy']: string | null;
} & {
    [key in 'MatchNo' | 'MatchStatus' | 'EventDateTime' | 'League' | 'Home' |
    'Away'
    ]: Required<string>
  } & TTicketCell & {
    AgentConfirm: Option[]
  } & {
    [key in TEditableKey]: string | undefined;
  }

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
  TUpdateRow
};
