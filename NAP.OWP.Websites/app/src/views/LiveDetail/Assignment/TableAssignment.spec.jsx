import React from 'react';
import TableAssignment from './TableAssignment';
import { fireEvent, render, screen, within } from '@testing-library/react';

describe('TableAssignment', () => {
  const policy = { HasRead: false, HasWrite: false };
  const dataSource = [
    {
      TotalRows: 1,
      DataSource: [
        {
          OWPMatchId: 1,
          Name: 'HDP',
          MaxBetFT: {
            MaxBet: '10K',
            Spread: '12%'
          },
          MaxBetHT: {
            MaxBet: '10K',
            Spread: '12%'
          },
          FT: {
            main: {},
            others: [],
            isAllowAdd: true
          },
          HT: {
            main: {},
            others: [],
            isAllowAdd: true
          },
          LA: {
            main: {},
            others: [],
            isAllowAdd: true
          }
        },
        {
          OWPMatchId: 1,
          Name: 'OU',
          MaxBetFT: {
            MaxBet: '10K',
            Spread: '12%',
          },
          MaxBetHT: {
            MaxBet: '10K',
            Spread: '12%',
          },
          FT: {
            main: {},
            others: [],
            isAllowAdd: true
          },
          HT: {
            main: {},
            others: [],
            isAllowAdd: true
          },
          LA: {
            main: {},
            others: [],
            isAllowAdd: true
          }
        }
      ]
    }
  ];

  beforeAll(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('should render component', () => {
    const props = {
      policy,
      dataSource
    };
    const { container } = render(<TableAssignment {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
