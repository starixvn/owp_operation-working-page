import ToastrWrapper from '../../../../components/ToastrWrapper';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getLeagueInfoThunk } from '../table/leagueInfoTableSlice/leagueInfoThunk';
import { selectData } from './slice/editSettingSlice';
import { updateSettingService } from './slice/editSettingThunk';

interface Props {
  closePopup: Function;
}

const EditSettingAction = (props: Props) => {
  const { closePopup } = props;
  const dispatch = useAppDispatch();
  const model = useAppSelector(selectData);

  const handleSave = async () => {
    console.log(model);
    const response = await updateSettingService(model);
    if (response.status === 200) {
      await ToastrWrapper.showInfo('The setting has been edited successfully!');
      dispatch(getLeagueInfoThunk(''));
    }
    closePopup();
  };
  return (
    <>
      <div className='list-btn'>
        <button
          className='btn-cancel'
          onClick={() => closePopup()}>
          Cancel
        </button>
        <button className='button-export' onClick={handleSave}>
          Save
        </button>
      </div></>
  );
};

export default EditSettingAction;