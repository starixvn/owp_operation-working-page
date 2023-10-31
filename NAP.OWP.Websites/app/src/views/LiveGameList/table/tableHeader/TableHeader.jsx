import React from 'react';
import { TABLE_HEADER } from '../TableSchema.json';
const TableHeader = () => {
  const colSpanObject = {
    'FT Trader': 3,
    'Other Product Trader': 3,
    '1H Trader': 2,
    'default': 1
  };
  return (
    <tr>
      {TABLE_HEADER.map((item, index) => {
        const colSpan = colSpanObject[item.headerName] || colSpanObject.default;
        return (
          <th style={{ width: `${item.size}%` }} key={index} colSpan={colSpan}>
            {item.headerName}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;
