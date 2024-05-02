import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import EditSettingContent from './EditSettingContent';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TDataSource } from '../table/TableType';
import { useEffect } from 'react';
import { getLeagueGroupOptionsThunk } from './slice/editSettingThunk';

interface Props {
  closePopup: Function,
  dataSource: TDataSource
};

const EditSettingPopup = (props: Props) => {
  const { closePopup, dataSource } = props;
  const dispatch = useAppDispatch();
  const { leagueGroupOptions } = useAppSelector(state => state.editSettingSlice);
  useEffect(() => {
    console.log("a");
    leagueGroupOptions.length === 0 && dispatch(getLeagueGroupOptionsThunk());
  }, [dispatch, leagueGroupOptions]);

  const handleSave = async () => {
    closePopup();
  };

  return (
    <Modal isOpen scrollable className='edit-setting-popup' modalClassName='edit-modal' centered>
      <ModalBody>
        <EditSettingContent data={dataSource} />
      </ModalBody>
      <ModalFooter>
        <div className='list-btn'>
          <button
            className='btn-cancel'
            onClick={() => closePopup()}>
            Cancel
          </button>
          <button className='button-export' onClick={handleSave}>
            Save
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditSettingPopup;