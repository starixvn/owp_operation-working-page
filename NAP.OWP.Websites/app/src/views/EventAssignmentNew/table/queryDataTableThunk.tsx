import { createAsyncThunk } from '@reduxjs/toolkit';
import { TQueryData } from '../type/type';
import Service from '../service/Service';
import store from '../app/store';
import Utils from '../../Shared/Utils';

const queryDataTableThunk = createAsyncThunk<TQueryData>(
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

    const dataQuery = await Service.query(eventModel);
    const lastUpdate = await Service.getLastUpdated(eventModel.EventDate);
    const syncOffVRLastUpdated = await Service.getSyncOffVRLastUpdated(
      eventModel.EventDate
    );
    return {
      data: dataQuery,
      syncOffVRLastUpdated,
      dateUpdated: lastUpdate
    };
  }
);

export default queryDataTableThunk;
