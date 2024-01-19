import { createAsyncThunk } from '@reduxjs/toolkit';
import { NET_CORE_URL } from '../const.json';
import { TDataTable } from '../type/type';
import Service from '../service/Service';
import store from '../app/store';
import Utils from '../../Shared/Utils';

const queryDataTableThunk = createAsyncThunk<TDataTable>(
  'dataTable/query',
  async () => {
    const filterState = store.getState().filter.filterState;
    const eventModel = {
      EventDate: Utils.formatDate(filterState.selectedDate),
      Username: filterState.userNameFilter || '',
      MatchStatusIds: filterState.selectedMatchStatus.map(x => x.value) || [],
      SelectedOffVRs: filterState.selectedOffVRs.map(x => x.value) || [],
      MatchType:
        filterState.selectedMatchType.map(x => x.value).join(',') || [],
      SyncLiveStatus: filterState.selectedSyncLive.value,
      ShowUnreadMessage: filterState.showUnreadMessage
    };

    const res = await Service.query(eventModel);
    console.log(res);
    return res;
  }
);

export default queryDataTableThunk;
