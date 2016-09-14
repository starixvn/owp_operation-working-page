import React from 'react';
import { render } from '@testing-library/react';
import { CellProps } from '../../../../typing/tableType';
import StatusCell from './StatusCell';

const props1: CellProps = {
  rowIndex: 0,
  dataSource: [
    {
      categoryName: 'Major',
      isActive: false,
      leagueSettingId: 2,
      maxBetHDP: 1,
      maxBetOU: 1,
      osLeagueName: 'CHINA FOOTBALL SUPER LEAGUE (PLAY OFF)',
      roundName: 'Pre Season',
      spreadHDP: 1,
      spreadOU: 1,
      summaryInfo: [],
      summaryRemark: []
    }
  ]
};
const props2: CellProps = {
  rowIndex: 0,
  dataSource: [
    {
      categoryName: 'Major',
      isActive: true,
      leagueSettingId: 2,
      maxBetHDP: 1,
      maxBetOU: 1,
      osLeagueName: 'CHINA FOOTBALL SUPER LEAGUE (PLAY OFF)',
      roundName: 'Pre Season',
      spreadHDP: 1,
      spreadOU: 1,
      summaryInfo: [],
      summaryRemark: []
    }
  ]
};

describe('ActiveCell under test', () => {
  it('Should render not checked', () => {
    const { container } = render(<StatusCell {...props1} />);
    const input = container.querySelector('svg');
    expect(input).toBeInTheDocument();
  });
});
