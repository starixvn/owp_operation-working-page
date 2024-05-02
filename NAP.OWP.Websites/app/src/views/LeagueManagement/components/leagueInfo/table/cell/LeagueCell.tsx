import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';
import EditSettingPopup from '../../editPopup/EditSettingPopup';
import { TDataSource } from '../TableType';

interface Props {
  className: string;
  dataSource: TDataSource;
}

const LeagueCell = (props: Props) => {
  const { className, dataSource } = props;
  const uuidKey = `${className}_${uuidv4()}`;
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <td className={className} onClick={() => setIsOpenPopup(true)}>
      <div
        className='row-table league'
        data-for={uuidKey}
        data-tip={dataSource.league}>
        {dataSource.league}
      </div>
      <ReactTooltip place='right' id={uuidKey} effect='solid' />
      {isOpenPopup &&
        <EditSettingPopup
          closePopup={() => setIsOpenPopup(false)}
          dataSource={dataSource}
        />}
    </td>
  );
};

export default LeagueCell;
