
type TEditableKey = 'agent' | 'estNote';

type TDataSource = {
  [key in 'runner' | 'otherProvider' | 'mb' | 'remark' | 'remarkBy']: string | null;
} & {
    [key in 'matchNo' | 'matchStatus' | 'eventDateTime' | 'league' | 'home' |
    'away'
    ]: Required<string>
  } & TTicketCell & {
    agentConfirm: number[]
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
  [key in 'hasTicket' | 'isRead']: boolean
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
