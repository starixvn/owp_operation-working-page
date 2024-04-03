
type TDataSource = {
  [key in 'runner' | 'otherProvider' | 'agent' | 'mb' | 'remark' | 'remarkBy' | 'estNote']: string | null | undefined;
} & {
    [key in 'matchNo' | 'matchStatus' | 'koTime' | 'league' | 'event']: Required<string>
  } & {
    [key in 'hasTicket' | 'isRead']: boolean
  } & {
    agentConfirm: number[]
  }

export {
  TDataSource
};
