import { MESSAGE } from '../const/const.json';
import store from '../app/store';
import ToastrWrapper from '../../components/ToastrWrapper';
import Spinner from '../../components/Spinner';
import { exportExcel } from '../filterArea/slice/ExportThunkNative';
import updateConfirmedThunk from '../table/updateConfirmedThunkNative';

const exportAndConfirmAllEvent = async () => {
  const { param } = store.getState().filter;
  const confirmResult = await ToastrWrapper.confirm(
    MESSAGE.EXPORT_AND_CONFIRM_ALL
  );
  if (confirmResult.value) {
    Spinner.show();
    const { entities } = store.getState().eventPickingTable;
    await store.dispatch(exportExcel(param));
    if (entities.length) {
      const infoSiteMatchIds = entities.map(element => element.infoSiteMatchId);
      await store.dispatch(
        updateConfirmedThunk({
          infoSiteMatchIds,
          confirmed: true
        })
      );
    }
    Spinner.hide();
  }
};

const exportOnly = () => {
  (async () => {
    const { param } = store.getState().filter;
    Spinner.show();
    await store.dispatch(exportExcel(param));
    Spinner.hide();
  })();
};

export { exportAndConfirmAllEvent, exportOnly };
