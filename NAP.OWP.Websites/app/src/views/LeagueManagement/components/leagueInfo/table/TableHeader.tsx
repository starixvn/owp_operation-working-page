import FilterHeader from './FilterHeader';
import { COLUMN_KEY } from './TableSchema.json';
import { TColumnKey } from './TableType';

const {
  League_Group,
  League,
  Tv,
  Round,
  League_Division,
  Remark,
  Spread_HDP_OU,
  MB_WK_HDP,
  MB_WK_NO_HDP,
  MB_WD_HDP,
  MB_WD_NO_HDP,
  LST_Note,
  Remark2,
  Comment
} = COLUMN_KEY;

const TableHeader = () => {
  return (
    <>
      <tr>
        <th rowSpan={2} className='blue-header'>
          <div className='header-table'>
            <span>#</span>
          </div>
        </th>
        <th rowSpan={2} className='blue-header'>
          <div className='header-table'>
            <span>League Group</span>
            <FilterHeader columnKey={League_Group as TColumnKey} />
          </div>
        </th>
        <th rowSpan={2} className='blue-header'>
          <div className='header-table'>
            <span>League</span>
            <FilterHeader columnKey={League as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} colSpan={4} className='grey-header'>
          Condition
        </th>
        <th rowSpan={2} className='blue-header'>
          <div className='header-table'>
            <span>Spread HDP - OU</span>
            <FilterHeader columnKey={Spread_HDP_OU as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} colSpan={2} className='light-blue-header'>
          MB Weekday
        </th>
        <th rowSpan={1} colSpan={2} className='pink-header'>
          MB Weekend
        </th>
        <th rowSpan={1} colSpan={2} className='blue-header'>
          Display in Mis match file
        </th>
        <th rowSpan={2} className='grey-header'>
          <div className='header-table'>
            <span>Comment</span>
            <FilterHeader columnKey={Comment as TColumnKey} />
          </div>
        </th>
      </tr>
      <tr>
        <th rowSpan={1} className='blue-header'>
          <div className='header-table'>
            <span>TV</span>
            <FilterHeader columnKey={Tv as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='blue-header'>
          <div className='header-table'>
            <span>Round</span>
            <FilterHeader columnKey={Round as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='blue-header'>
          <div className='header-table'>
            <span>League Division</span>
            <FilterHeader columnKey={League_Division as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='blue-header'>
          <div className='header-table'>
            <span>Remark</span>
            <FilterHeader columnKey={Remark as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='light-blue-header'>
          <div className='header-table'>
            <span>HDP(K)</span>
            <FilterHeader columnKey={MB_WD_HDP as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='light-blue-header'>
          <div className='header-table'>
            <span>NO.HDP</span>
            <FilterHeader columnKey={MB_WD_NO_HDP as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='pink-header'>
          <div className='header-table'>
            <span>HDP</span>
            <FilterHeader columnKey={MB_WK_HDP as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='pink-header'>
          <div className='header-table'>
            <span>NO.HDP</span>
            <FilterHeader columnKey={MB_WK_NO_HDP as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='blue-header'>
          <div className='header-table'>
            <span>LST Note (Show under League)</span>
            <FilterHeader columnKey={LST_Note as TColumnKey} />
          </div>
        </th>
        <th rowSpan={1} className='blue-header'>
          <div className='header-table'>
            <span>Remark 2 (Show under match)</span>
            <FilterHeader columnKey={Remark2 as TColumnKey} />
          </div>
        </th>
      </tr>
    </>
  );
};
export default TableHeader;
