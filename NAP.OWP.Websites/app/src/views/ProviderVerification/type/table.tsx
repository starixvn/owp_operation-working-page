
type TDataSource = {
  [key in 'runner' | 'otherProvider' | 'agent' | 'mb' | 'remark' | 'remarkBy' | 'estNote']: string | null;
} & {
    [key in 'matchNo' | 'matchStatus' | 'eventDateTime' | 'league' | 'home' |
    'away'
    ]: Required<string>
  } & TTicketCell & {
    agentConfirm: number[]
  }

type TCommonCell = {
  className: string | undefined,
  value: string | null
};

type TTicketCell = {
  [key in 'hasTicket' | 'isRead']: boolean
} & { rowIndex: number }

export {
  TDataSource,
  TCommonCell,
  TTicketCell
};
