import React from 'react';
import MaxbetInfo from '../../../component/MaxbetInfo';
import { CellProps } from '../../../type/TableType';

const FirstHalfTraderCell = ({
  dataSource,
  rowIndex
}: CellProps): JSX.Element => {
  const { MatchSetting, Assignment } = dataSource[rowIndex];
  const { Handicap1st, OverUnder1st } = MatchSetting;

  return (
    <div className='fh-trader-cell'>
      <table>
        <tbody>
          <tr>
            <MaxbetInfo
              name={null}
              maxbet={Handicap1st}
              traders={Assignment.Handicap1st}
              others={Assignment.Handicap1stOthers}
            />
          </tr>
          <tr>
            <MaxbetInfo
              name={null}
              maxbet={OverUnder1st}
              traders={Assignment.OverUnder1st}
              others={Assignment.OverUnder1stOthers}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FirstHalfTraderCell;
