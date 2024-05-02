import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import EditSettingContent from './EditSettingContent';

interface Props {
  closePopup: Function,
  leagueSettingId: number,
  leagueName: string
};

const EditSettingPopup = (props: Props) => {
  const { closePopup, leagueSettingId, leagueName } = props;

  const handleSave = async () => {
    closePopup();
  };

  return (
    <Modal isOpen scrollable className='edit-setting-popup' centered>
      <ModalHeader>
        {leagueName}
      </ModalHeader>
      <ModalBody>
        <EditSettingContent />
        <div className='list-btn'>
          <button
            className='button-cancel'
            onClick={() => closePopup()}>
            Cancel
          </button>
          <button className='button-export' onClick={handleSave}>
            Save
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditSettingPopup;