import React from 'react';
import Condition from './content/Condition';
import FtSpread from './content/FtSpread';
import MB from './content/MB';
import MicsMatch from './content/MicsMatch';
import Comment from './content/Comment';
import Header from './content/Header';

interface Props {
  data: any
}

const EditSettingContent = (props: Props) => {
  const { data } = props;

  return (
    <div>
      <Header data={data} />
      <Condition />
      <FtSpread />
      <MB />
      <MicsMatch />
      <Comment />
    </div>
  );
};

export default EditSettingContent;