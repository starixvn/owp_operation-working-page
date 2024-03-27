import {
  TABLE_HEADER,
  TABLE_HEADER_TURN_OVER_MARGIN
} from '../TableSchema.json';
import FilterHeader from './FilterHeader';
import CheckboxHeader from './CheckboxHeader';
import store from '../../app/store';
import MultipleFilterHeader from './MultipleFilterHeader';

const TableHeader = () => {
  const {
    turnOverMarginPolicy: {
      permission: { HasRead }
    }
  } = store.getState();

  return (
    <tr>
      {{
        true: TABLE_HEADER_TURN_OVER_MARGIN,
        false: TABLE_HEADER
      }[`${HasRead}`].map((item, index) => {
        return (
          <th
            colSpan={item?.colSpan}
            style={{ width: `${item.size}%` }}
            key={index}>
            <div className='header-table'>
              <span>{item.headerName}</span>
              {item?.isFilter && <FilterHeader columnKey={item.columnKey} />}
              {item?.isFilterMultiple && <MultipleFilterHeader columnKey={item.columnKey} />}
            </div>
            {item?.isCheckBox && (
              <CheckboxHeader
                classNameProps={item?.className}
                columnKey={item.columnKey}
              />
            )}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;
