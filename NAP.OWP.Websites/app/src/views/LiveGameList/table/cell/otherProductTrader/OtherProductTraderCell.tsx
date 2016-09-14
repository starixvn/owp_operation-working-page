import React from 'react';
import { CellProps } from '../../../type/TableType';
import MaxbetInfo from './../../../component/MaxbetInfo';

const OtherProductTraderCell = ({
  dataSource,
  rowIndex
}: CellProps): JSX.Element => {
  const { MatchSetting, Assignment, RowSpan } = dataSource[rowIndex];
  const {
    OneXTwo,
    OneXTwo1st,
    FastMarket,
    Specific10Mins,
    Specific15Mins
  } = MatchSetting;

  const height = RowSpan === 0 ? '50%' : '';

  return (
    <div className='other-product-trader-cell'>
      <table>
        <tbody>
          <tr style={{ 'height': `${height}` }}>
            <MaxbetInfo
              name='FT1X2'
              maxbet={OneXTwo}
              traders={Assignment.OneXTwo}
              others={Assignment.OneXTwoOthers}
            />
          </tr>
          <tr style={{ 'height': `${height}` }}>
            <MaxbetInfo
              name='HT1X2'
              maxbet={OneXTwo1st}
              traders={Assignment.OneXTwo1st}
              others={Assignment.OneXTwo1stOthers}
            />
          </tr>

          {Assignment.FastMarket.length > 0 && (
            <tr>
              <MaxbetInfo
                name='FM'
                maxbet={FastMarket}
                traders={Assignment.FastMarket}
                others={Assignment.FastMarketOthers}
              />
            </tr>
          )}
          {Assignment.AllInOne.length > 0 && (
            <tr>
              <MaxbetInfo
                name='AIO'
                maxbet={null}
                traders={Assignment.AllInOne}
                others={Assignment.AllInOneOthers}
              />
            </tr>
          )}
          {Assignment.Specific15Mins.length > 0 && (
            <tr>
              <MaxbetInfo
                name='15mins'
                maxbet={Specific15Mins}
                traders={Assignment.Specific15Mins}
                others={Assignment.Specific15MinsOthers}
              />
            </tr>
          )}
          {Assignment.Specific10Mins.length > 0 && (
            <tr>
              <MaxbetInfo
                name='10mins'
                maxbet={Specific10Mins}
                traders={Assignment.Specific10Mins}
                others={Assignment.Specific10MinsOthers}
              />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OtherProductTraderCell;
