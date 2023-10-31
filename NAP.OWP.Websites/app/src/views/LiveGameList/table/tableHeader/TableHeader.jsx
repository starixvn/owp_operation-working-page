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
      {TABLE_HEADER.map((header, index) => {
        const colSpan = colSpanObject[header] || colSpanObject.default;
        return (
          <th key={index} colSpan={colSpan} className={header}>
            {header}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;
