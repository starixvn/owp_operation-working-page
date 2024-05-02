import React from 'react';
import Condition from './content/Condition';
import FtSpread from './content/FtSpread';
import MB from './content/MB';
import MicsMatch from './content/MicsMatch';
import Comment from './content/Comment';
import Header from './content/Header';
import { TDataSource } from '../table/TableType';

interface Props {
  data: TDataSource
}

const EditSettingContent = (props: Props) => {
  const { data } = props;

  return (
    <div>
      <Header data={data} />
      <Condition data={data} />
      <FtSpread />
      <MB />
      <MicsMatch />
      <Comment />
    </div>
  );
};

export default EditSettingContent;