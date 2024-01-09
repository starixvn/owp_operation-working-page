import React from 'react';
import { TABLE_HEADER } from '../TableSchema.json';
import FilterHeader from './FilterHeader';
import CheckboxHeader from './CheckboxHeader';
import SortHeader from './SortHeader';

const TableHeader = () => {
  return (
    <tr>
      {TABLE_HEADER.map((item, index) => {
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
