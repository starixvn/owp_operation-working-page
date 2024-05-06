import { useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TDataSource } from '../table/TableType';
import EditSettingContent from './EditSettingContent';
import { TEditSetting } from './EditType';
import { mapDataSourceToEditSetting } from './helper/helper';
import { getLeagueGroupOptionsThunk } from './slice/editSettingThunk';

interface Props {
  closePopup: Function,
  dataSource: TDataSource
};

const EditSettingPopup = (props: Props) => {
  const { closePopup, dataSource } = props;
  let setting = mapDataSourceToEditSetting(dataSource);
  const dispatch = useAppDispatch();
  const model = useAppSelector(state => state.editSettingSlice.editModel);

  const updateSetting = (inputKey: keyof TEditSetting, newValue: string) => {
    setting = { ...setting, [inputKey]: newValue };
    console.log(setting);
  };
  const newProps = {
    data: model,
    updateSetting
  };

  const { leagueGroupOptions } = useAppSelector(state => state.editSettingSlice);
  useEffect(() => {
    leagueGroupOptions.length === 0 && dispatch(getLeagueGroupOptionsThunk());
  }, [dispatch, leagueGroupOptions]);

  const handleSave = async () => {
    console.log(setting);
    closePopup();
  };

  return (
    <Modal isOpen scrollable className='edit-setting-popup' modalClassName='edit-modal' centered>
      <ModalBody>
        <EditSettingContent {...newProps} />
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