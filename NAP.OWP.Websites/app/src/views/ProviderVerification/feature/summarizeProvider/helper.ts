import { TProviderCount } from '../../type/provider';
import { TDataSource } from '../../type/table';

const agentOption = [
  { 'agentId': 1, 'agentName': '365GV' },
  { 'agentId': 2, 'agentName': 'Betradar' },
  { 'agentId': 3, 'agentName': 'BG' },
  { 'agentId': 4, 'agentName': 'FC' },
  { 'agentId': 5, 'agentName': 'IMG' },
  { 'agentId': 6, 'agentName': 'RB2' },
  { 'agentId': 7, 'agentName': 'RB3' },
  { 'agentId': 8, 'agentName': 'RTS' },
  { 'agentId': 9, 'agentName': 'SLR' },
  { 'agentId': 10, 'agentName': 'WOO' },
  { 'agentId': 11, 'agentName': 'Streaming' },
  { 'agentId': 12, 'agentName': 'Cancel' }
];

export const summarize = (data: TDataSource[]) => {
  const agents = data.map(x => x.AgentConfirm.map(agent => agent.Label)).flat();
  const agentLabels = agentOption.map(x => x.agentName);
  const agentCounts = agentLabels.map(agentName => {
    const count = agents.filter(agent => agent === agentName).length;
    return { agentName, count } as TProviderCount;
  });

  return agentCounts;
};
