import React from 'react';
import useStore from '../../app/store';
import LAKpiTable from './LAKpiTable';
import { render } from '@testing-library/react';

useStore.setState({
  dataTable: {
    entities: [
      {
        userName: 'User1',
        progress: '100%',
        target: '150%',
        gapWithTarget: {
          virtualMatches: 10,
          multipleMatches: 5,
          specialProducts: 2,
          fiveMajorLeagues: 3,
          multipleProducts: 8
        },
        achievedGames: {
          virtualMatches: 15,
          multipleMatches: 8,
          specialProducts: 3,
          fiveMajorLeagues: 4,
          multipleProducts: 12
        },
        reward: 200
      },
      {
        userName: 'User2',
        progress: '75%',
        target: '100%',
        gapWithTarget: {
          virtualMatches: 5,
          multipleMatches: 3,
          specialProducts: 1,
          fiveMajorLeagues: 2,
          multipleProducts: 5
        },
        achievedGames: {
          virtualMatches: 8,
          multipleMatches: 5,
          specialProducts: 2,
          fiveMajorLeagues: 2,
          multipleProducts: 6
        },
        reward: 100
      }
    ],
    loadingStatus: 'idle'
  }
});

describe('render table', () => {
  it('should render', () => {
    const { container } = render(<LAKpiTable />);
    expect(container).toMatchSnapshot();
  });
});
