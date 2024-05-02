import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';
import EditSettingPopup from '../../editPopup/EditSettingPopup';

const LeagueCell = ({ className = '', value = '' }) => {
  const uuidKey = `${className}_${uuidv4()}`;
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <td className={className} onClick={() => console.log('handleOnclick')}>
      <div
        className='row-table league'
        data-for={uuidKey}
        data-tip={value}
        onClick={() => setIsOpenPopup(true)}>
        {value}
      </div>
      <ReactTooltip place='right' id={uuidKey} effect='solid' />
      {isOpenPopup &&
        <EditSettingPopup
          closePopup={() => setIsOpenPopup(false)}
          leagueSettingId={1}
        />}
    </td>
  );
};

export default LeagueCell;
