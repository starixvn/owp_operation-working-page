import React from 'react';
import { TTotalGameInfo } from '../type/TableType.native';
import { uniqueId } from 'lodash';
import { keyOfTotalGameInfo } from '../../TableConst.json';

const TableBodyTotalGame = (props: TTotalGameInfo) => {
  return (
    <>
      {keyOfTotalGameInfo.map(x => (
        <td key={uniqueId()}>{props[x.key as keyof TTotalGameInfo]}</td>
      ))}
    </>
  );
};

export default TableBodyTotalGame;
