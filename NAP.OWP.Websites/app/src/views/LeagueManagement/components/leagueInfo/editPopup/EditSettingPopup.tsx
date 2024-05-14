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
import { getLeagueGroupOptionsThunk } from './slice/editSettingThunk';


interface Props {
  closePopup: () => void
};

const EditSettingPopup = (props: Props) => {
  const { closePopup } = props;
  const dispatch = useAppDispatch();
  const { leagueGroupOptions,
    league,
    leagueGroupId,
    hasTv,
    hasIpTv,
    ipTv,
    round,
    division,
    remark,
    spread,
    maxbetWD_HDP,
    wD_NoOfHDP,
    maxbetWK_HDP,
    wK_NoOfHDP,
    comment,
    lstNote,
    remark2 } = useAppSelector(state => state.editSettingSlice);

  useEffect(() => {
    leagueGroupOptions.length === 0 && dispatch(getLeagueGroupOptionsThunk());
  }, [dispatch, leagueGroupOptions]);

  return (
    <Modal isOpen scrollable className='edit-setting-popup' modalClassName='edit-modal' centered>
      <ModalBody>
        <Header league={league} leagueGroupId={leagueGroupId} />
        <Condition condition={{
          hasTv,
          hasIpTv,
          ipTv,
          round,
          division,
          remark
        }} />
        <FtSpread spread={spread} />
        <MB maxbetWD_HDP={maxbetWD_HDP}
          wD_NoOfHDP={wD_NoOfHDP}
          maxbetWK_HDP={maxbetWK_HDP}
          wK_NoOfHDP={wK_NoOfHDP}
        />
        <MicsMatch lstNote={lstNote} remark2={remark2} />
        <Comment comment={comment} />
      </ModalBody>
      <ModalFooter>
        <EditSettingAction closePopup={closePopup} />
      </ModalFooter>
    </Modal>
  );
};

export default EditSettingPopup;