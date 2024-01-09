import React from 'react';
import { TABLE_HEADER, TABLE_HEADER_TURN_OVER_MARGIN } from '../TableSchema.json';
import FilterHeader from './FilterHeader';
import CheckboxHeader from './CheckboxHeader';
import SortHeader from './SortHeader';
import store from '../../app/store';

const TableHeader = () => {
  const { turnOverMarginPolicy: {
    permission: { HasRead }
  } } = store.getState();

  return (
    <tr>
      {{
        true: TABLE_HEADER_TURN_OVER_MARGIN,
        false: TABLE_HEADER
      }[`${HasRead}`].map((item, index) => {
        return (
          <th style={{ width: `${item.size}%` }} key={index}>
            <div className='header-table'>
              <span>{item.headerName}</span>
              {item?.isFilter && <FilterHeader columnKey={item.headerName} />}
              {item?.isSort && <SortHeader columnKey={item.headerName} />}
            </div>
            {item?.isCheckBox && (
              <CheckboxHeader
                classNameProps={item?.className}
                columnKey={item.headerName}
              />
            )}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;
