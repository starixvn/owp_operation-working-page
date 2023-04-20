import React, { useState } from 'react';
import { shallow } from 'zustand/shallow';
import useStore from '../../app/useStore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const ColorExplain = () => {
  const { colorInfo, queryColorInfo } = useStore(
    state => ({
      loading: state.loadingColorExplain,
      colorInfo: state.colorExplainInfo,
      queryColorInfo: state.queryColorExplain
    }),
    shallow
  );
  const [display, setDisplay] = useState(false);

  const renderColorExplain = () => {
    return colorInfo.map(c => (
      <li
        key={c.label}
        style={{
          backgroundColor: c.backgroundColor,
          color: c.textColor
        }}>
        {c.label}
      </li>
    ));
  };

  const showHideColorExplain = () => {
    !display && !colorInfo.length && queryColorInfo();
    setDisplay(!display);
  };

  return (
    <div className='color__explain_info' onClick={showHideColorExplain}>
      <span className='info'>
        <InfoOutlinedIcon />
      </span>
      <ul>{display && renderColorExplain()}</ul>
    </div>
  );
};

export default ColorExplain;
