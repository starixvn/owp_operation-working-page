import ToastrWrapper from '../../../../components/ToastrWrapper';
import store from '../app/storeNative';
import { updateSettingService } from './slice/editSettingThunk';

const EditSettingAction = (props: { closePopup: Function; }) => {
  const { closePopup } = props;

  const { editSettingSlice: {
    leagueSettingId,
    league,
    owpLeagueId,
    leagueGroupId,
    leagueGroup,
    spread,
    maxbetWD_HDP,
    wD_NoOfHDP,
    maxbetWK_HDP,
    wK_NoOfHDP,
    lstNote,
    remark2,
    comment,
    hasTv,
    hasIpTv,
    remark,
    ipTv,
    round,
    division,
  } } = store.getState();

  const handleSave = async () => {
    const response = await updateSettingService({
      leagueSettingId,
      league,
      owpLeagueId,
      leagueGroupId,
      leagueGroup,
      spread,
      maxbetWD_HDP,
      wD_NoOfHDP,
      maxbetWK_HDP,
      wK_NoOfHDP,
      lstNote,
      remark2,
      comment,
      hasTv,
      hasIpTv,
      remark,
      ipTv: ipTv.filter(d => d.value) || [],
      round: round.filter(d => d.value) || [],
      division: division.filter(d => d.value) || []
    });
    if (response.status === 200) {
      await ToastrWrapper.showInfo('The setting has been edited successfully!');
    }
    closePopup();
  };
  return (
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
  );
};

export default EditSettingAction;