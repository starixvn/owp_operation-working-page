import { MouseEvent, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';
import EditSettingPopup from '../../editPopup/EditSettingPopup';
import { TDataSource } from '../TableType';
import { setInitSetting } from '../../editPopup/slice/editSettingSlice';
import { useAppDispatch } from '../../app/hooks';

interface Props {
  className: string;
  dataSource: TDataSource;
}

const LeagueCell = (props: Props) => {
  const { className, dataSource } = props;
  const uuidKey = `${className}_${uuidv4()}`;
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenPopup = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(setInitSetting(dataSource));
    setIsOpenPopup(true);
  };

  return (
    <td className={className}>
      <span
        onClick={handleOpenPopup}
        className='row-table league'
        data-tip={dataSource.league}>
        {dataSource.league}
      </span>
      <ReactTooltip place='right' id={uuidKey} effect='solid' />
      {isOpenPopup &&
        <EditSettingPopup
          closePopup={() => setIsOpenPopup(false)}
        />}
    </td>
  );
};

export default LeagueCell;
