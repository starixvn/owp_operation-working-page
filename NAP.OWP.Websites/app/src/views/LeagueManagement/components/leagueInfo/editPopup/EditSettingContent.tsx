import React from 'react';
import Condition from './content/Condition';
import FtSpread from './content/FtSpread';
import MB from './content/MB';
import MicsMatch from './content/MicsMatch';
import Comment from './content/Comment';
import Header from './content/Header';
import { TEditSetting } from './EditType';

interface Props {
  data: TEditSetting,
  updateSetting: Function
}

const EditSettingContent = (props: Props) => {
  return (
    <div>
      <Header {...props} />
      <Condition {...props} />
      <FtSpread {...props} />
      <MB {...props} />
      <MicsMatch {...props} />
      <Comment {...props} />
    </div>
  );
};

export default EditSettingContent;