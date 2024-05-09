import { useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TDataSource } from '../table/TableType';
import EditSettingAction from './EditSettingContent';
import Comment from './content/Comment';
import Condition from './content/Condition';
import FtSpread from './content/FtSpread';
import Header from './content/Header';
import MB from './content/MB';
import MicsMatch from './content/MicsMatch';
import { setInitSetting } from './slice/editSettingSlice';
import { getLeagueGroupOptionsThunk } from './slice/editSettingThunk';

interface Props {
  closePopup: Function,
  dataSource: TDataSource
};

const EditSettingPopup = (props: Props) => {
  console.log("render-popup");
  const { dataSource, closePopup } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInitSetting(dataSource));
  }, [dispatch, dataSource]);

  const leagueGroupOptions = useAppSelector(state => state.editSettingSlice.leagueGroupOptions);
  useEffect(() => {
    leagueGroupOptions.length === 0 && dispatch(getLeagueGroupOptionsThunk());
  }, [dispatch, leagueGroupOptions]);

  return (
    <Modal isOpen scrollable className='edit-setting-popup' modalClassName='edit-modal' centered>
      <ModalBody>
        <Header data={dataSource} />
        <Condition data={dataSource} />
        <FtSpread data={dataSource} />
        <MB data={dataSource} />
        <MicsMatch data={dataSource} />
        <Comment data={dataSource} />
      </ModalBody>
      <ModalFooter>
        <EditSettingAction closePopup={closePopup} />
      </ModalFooter>
    </Modal>
  );
};

export default EditSettingPopup;