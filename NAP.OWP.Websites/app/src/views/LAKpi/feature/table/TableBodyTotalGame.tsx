import React, { Fragment } from 'react';
import { TTotalGameInfo } from '../type/TableType.native';
import { uniqueId } from 'lodash';
import { keyOfTotalGameInfo } from './TableConst.json';

type TableBodyTotalGameRowProps = {
  data: TTotalGameInfo;
};

const TableBodyTotalGame = (props: TableBodyTotalGameRowProps) => {
  const { data } = props;
  return (
    <>
      {keyOfTotalGameInfo.map(x => (
        <Fragment key={uniqueId()}>
          <td>{data[x.key as keyof TTotalGameInfo]}</td>
        </Fragment>
      ))}
    </>
  );
};

export default TableBodyTotalGame;
