import React from 'react';
import MaxbetInfo from '../../../component/MaxbetInfo';
import { CellProps } from '../../../type/TableType';

const FtTraderCell = ({ dataSource, rowIndex }: CellProps): JSX.Element => {
  const { MatchSetting, Assignment } = dataSource[rowIndex];
  const { Handicap, OverUnder } = MatchSetting;

  return (
    <div className='ft-trader-cell'>
      <table>
        <tbody>
          <tr>
            <MaxbetInfo
              name='HDP'
              maxbet={Handicap}
              traders={Assignment.Handicap}
              others={Assignment.HandicapOthers}
            />
          </tr>
          <tr>
            <MaxbetInfo
              name='OU'
              maxbet={OverUnder}
              traders={Assignment.OverUnder}
              others={Assignment.OverUnderOthers}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FtTraderCell;
