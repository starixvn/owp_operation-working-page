
type TDataSource = {
  [key in 'runner' | 'otherProvider' | 'agent' | 'mb' | 'remark' | 'remarkBy' | 'EstNote']: string | null | undefined;
} & {
    [key in 'matchNo' | 'matchStatus' | 'koTime' | 'league' | 'event']: Required<string>
  } & {
    [key in 'hasTicket' | 'isRead']: boolean
  } & {
    agentConfirm: boolean
  }

export {
  TDataSource
};
