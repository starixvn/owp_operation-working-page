import Spinner from '../../components/Spinner';
import store from '../app/store';
import { TDataSource } from '../types/noOfferMatchType';
import updateConfirmedThunk from '../table/updateConfirmedThunkNative';

const updateConfirmAllEvent = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const { checked } = event.target;
  const { entities } = store.getState().eventPickingTable;
  if (entities.length) {
    Spinner.show();
    const infoSiteMatchIds = (entities as TDataSource[]).map(
      element => element.infoSiteMatchId
    );

    await store.dispatch(updateConfirmedThunk({
      infoSiteMatchIds,
      confirmed: checked
    }));
    Spinner.hide();
  }
};

export default updateConfirmAllEvent;