import { StateCreator } from 'zustand';
import { TQueryLiveGameAssignment } from '../type/type';
import { REQUEST_STATUS } from '../../Shared/Constants';

const createTableSlice: StateCreator<
  TQueryLiveGameAssignment,
  [],
  [],
  TQueryLiveGameAssignment
> = (set, get) => ({
  loadingDataTable: REQUEST_STATUS.pending,
  dataTable: [{
    oWPMatchId: 1235463,
    parentMatchId: 1235463,
    matchStatus: "Completed",
    infoSiteMatchId: 123456,
    isInfoSiteLinked: false,
    isLiveStatusSynchronized: false,
    isShowAbsenceIcon: false,
    matchNo: '001',
    kickOffTime: '01:00 AM',
    kickOffTimeStr: "01:00:00",
    infoSiteTime: '01:00 AM',
    infoSiteTimeDisplay: "01:00:00",
    otherTime: "02:00 PM",
    otherTimeStr: "14:00:00",
    league: "LeagueTest",
    home: "HTeam",
    away: "ATeam",
    leagueGroup: null,
    noOfHDP: '1 line 11',
    matchOffers: [{
      id: 2,
      OWPMatchId: 1235463,
      matchOfferValue: 'Fast Market'
    },
    {
      id: 11,
      OWPMatchId: 1235463,
      matchOfferValue: '100s Accept'
    }]
  }],
  queryDataTable: async () => {
    set({ loadingDataTable: REQUEST_STATUS.pending });
    // TODO
    set({
      dataTable: [],
      loadingDataTable: REQUEST_STATUS.idle
    });
  },
});

export default createTableSlice;
