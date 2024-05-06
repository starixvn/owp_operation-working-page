import React from 'react';
import { TProps } from '../EditType';
import CommonTextArea from '../component/CommonTextArea';

const Comment: React.FC<TProps> = ({ data, updateSetting }) => {
  return (
    <div className='list'>
      <div className='title'>Comment</div>
      <div className='content-column-2'>
        <CommonTextArea
          value={data.comment}
          inputKey={'spread_HDP'}
          updateObject={updateSetting}
          rows={6}
        />
      </div>
    </div >
  );
};

export default Comment;