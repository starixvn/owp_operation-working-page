import { TDataSource } from './TableType';
import { itemRowHeight } from './TableSchema.json';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const propTypes = {
  data: PropTypes.array,
  displayStart: PropTypes.number,
  displayEnd: PropTypes.number
};

const TableBody = ({ data = [], displayStart = 0, displayEnd = 0 }) => {
  const rows = [];

  rows.push(
    <tr
      key='startRowFiller'
      style={{ height: displayStart * itemRowHeight }}></tr>
  );
  for (let i = displayStart; i < displayEnd; ++i) {
    let row = data[i] as TDataSource;
    rows.push(
      <tr key={uniqueId()}>
        <td className='no-cell'>
          <div className='row-css'>{i + 1}</div>
        </td>
        <td className='league-group-cell'>
          <div className='row-css'>{row.leagueGroup}</div>
        </td>
        <td className='league-cell'>
          <div className='row-css'>{row.league}</div>
        </td>
        <td className='tv-cell'>
          <div className='row-css'>{row.tv}</div>
        </td>
        <td className='round-cell'>
          <div className='row-css'>{row.round}</div>
        </td>
        <td className='league-division-cell'>
          <div className='row-css'>{row.leagueDivision}</div>
        </td>
        <td className='remark-cell'>
          <div className='row-css'>{row.remark}</div>
        </td>
        <td className='spread-hdp-cell'>
          <div className='row-css'>{row.spreadHDP}</div>
        </td>
        <td className='spread-ou-cell'>
          <div className='row-css'>{row.spreadOU}</div>
        </td>
        <td className='mb-weekday-hdp'>
          <div className='row-css'>{row.maxbetWeekdayHDP}</div>
        </td>
        <td className='mb-weekday-ou'>
          <div className='row-css'>{row.maxbetWeekdayNoHDP}</div>
        </td>
        <td className='mb-weekend-hdp'>
          <div className='row-css'>{row.maxbetWeekendHDP}</div>
        </td>
        <td className='mb-weekend-hdp'>
          <div className='row-css'>{row.maxbetWeekendNoHDP}</div>
        </td>
        <td className='lst-note-cell'>
          <div className='row-css'>{row.lstNote}</div>
        </td>
        <td className='remark2-cell'>
          <div className='row-css'>{row.remark2}</div>
        </td>
        <td className='comment-cell'>
          <div className='row-css'>{row.comment}</div>
        </td>
      </tr>
    );
  }
  rows.push(
    <tr
      key='endRowFiller'
      style={{ height: (data.length - displayEnd) * itemRowHeight }}></tr>
  );

  return <>{rows}</>;
};

export default TableBody;
