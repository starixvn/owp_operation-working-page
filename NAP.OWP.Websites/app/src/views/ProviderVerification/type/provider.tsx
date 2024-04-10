type TProviderCount = {
  agentName: string;
  count: number;
}

type TAgentCompare = {
  koTime: string;
  league: string;
  home: string;
  away: string;
}

type TCompareCountResult = {
  koTime: string;
  dataCount: number;
  agentFileCount: number;
}

export { TProviderCount, TAgentCompare, TCompareCountResult };