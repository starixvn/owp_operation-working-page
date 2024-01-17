import { createAsyncThunk } from '@reduxjs/toolkit';
import { NET_CORE_URL } from '../const.json';
import { post } from '../../Shared/Service/Service';
import { TDataTable } from '../type/type';

const buildRequestURL = () =>
  process.env.NODE_ENV === 'development'
    ? `${NET_CORE_URL}/`
    : `${window.netCoreRootUrl}/api/EventPicking/`;

const queryDataTableThunk = createAsyncThunk<TDataTable>(
  'dataTable/query',
  async () => {
    // TODO
    const url = '';

    return [
      {
        Notes: [
          {
            LastUpdated: '2024-01-17T14:14:41.673-04:00',
            MatchNoteId: 8313768,
            Note: 'test',
            OWPMatchId: 1235463,
            UserId: 360418,
            Username: 'starix1'
          },
          {
            LastUpdated: '2024-01-17T14:14:41.673-04:00',
            MatchNoteId: 8313769,
            Note: 'test2',
            OWPMatchId: 1235463,
            UserId: 360418,
            Username: 'starix1'
          }
        ],
        oWPMatchId: 1235463,
        parentMatchId: 1235463,
        matchStatus: 'Completed',
        infoSiteMatchId: 123456,
        isInfoSiteLinked: false,
        isLiveStatusSynchronized: false,
        isShowAbsenceIcon: false,
        matchNo: '001',
        kickOffTime: '01:00 AM',
        kickOffTimeStr: '01:00:00',
        infoSiteTime: '01:00 AM',
        infoSiteTimeDisplay: '01:00:00',
        otherTime: '02:00 PM',
        otherTimeStr: '14:00:00',
        league: 'LeagueTest',
        home: 'HTeam',
        away: 'ATeam',
        leagueGroup: null,
        noOfHDP: '1 line 11',
        noOfHDPId: 11,
        matchCode: 'matchCode',
        adminSiteId: 123,
        matchOffers: [
          {
            id: 2,
            OWPMatchId: 1235463,
            matchOfferValue: 'Fast Market'
          },
          {
            id: 11,
            OWPMatchId: 1235463,
            matchOfferValue: '100s Accept'
          }
        ]
      },
      {
        Notes: [
          {
            LastUpdated: '2024-01-17T14:14:41.673-04:00',
            MatchNoteId: 8313768,
            Note: 'test',
            OWPMatchId: 1235463,
            UserId: 360418,
            Username: 'starix1'
          }
        ],
        oWPMatchId: 1235463,
        parentMatchId: 1235463,
        matchStatus: 'Completed',
        infoSiteMatchId: 123456,
        isInfoSiteLinked: false,
        isLiveStatusSynchronized: false,
        isShowAbsenceIcon: false,
        matchNo: '001',
        kickOffTime: '01:00 AM',
        kickOffTimeStr: '01:00:00',
        infoSiteTime: '01:00 AM',
        infoSiteTimeDisplay: '01:00:00',
        otherTime: '02:00 PM',
        otherTimeStr: '14:00:00',
        league: 'LeagueTest',
        home: 'HTeam',
        away: 'ATeam',
        leagueGroup: null,
        noOfHDP: '1 line 11',
        noOfHDPId: 11,
        matchCode: 'matchCode',
        adminSiteId: 123,
        matchOffers: [
          {
            id: 2,
            OWPMatchId: 1235463,
            matchOfferValue: 'Fast Market'
          },
          {
            id: 11,
            OWPMatchId: 1235463,
            matchOfferValue: '100s Accept'
          }
        ]
      }
    ];
  }
);

export default queryDataTableThunk;
