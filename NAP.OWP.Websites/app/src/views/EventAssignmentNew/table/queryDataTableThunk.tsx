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
        oneXTwo: [],
        fM: [
          {
            'AssignmentId': 0,
            'OWPMatchId': 1238731,
            'ParentMatchId': 1238728,
            'Bettype': 1,
            'MinorBettypeId': -88,
            'AssignmentType': 0,
            'UserId': 0,
            'Username': null,
            'AssignmentNote': null
          }
        ],
        aIO: [
          {
            'AssignmentId': 0,
            'OWPMatchId': 1238732,
            'ParentMatchId': 1238728,
            'Bettype': 1,
            'MinorBettypeId': -89,
            'AssignmentType': 0,
            'UserId': 0,
            'Username': null,
            'AssignmentNote': null
          }
        ],
        handicap: [
          {
            'AssignmentId': 2220209,
            'OWPMatchId': 1238728,
            'ParentMatchId': 1238728,
            'Bettype': 1,
            'MinorBettypeId': null,
            'AssignmentType': 1,
            'UserId': 17052703,
            'Username': 'CCSANNA',
            'AssignmentNote': null
          },
          {
            'AssignmentId': 2220210,
            'OWPMatchId': 1238728,
            'ParentMatchId': 1238728,
            'Bettype': 1,
            'MinorBettypeId': null,
            'AssignmentType': 2,
            'UserId': 17052703,
            'Username': 'CCSANNA',
            'AssignmentNote': '#<user>'
          }
        ],
        handicap1st: [],
        overUnder: [],
        overUnder1st: [],
        oneXTwo1st: [],
        specific15Mins: [
          {
            'AssignmentId': 0,
            'OWPMatchId': 1238729,
            'ParentMatchId': 1238728,
            'Bettype': 1,
            'MinorBettypeId': -1,
            'AssignmentType': 0,
            'UserId': 0,
            'Username': null,
            'AssignmentNote': null
          }
        ],
        specific10Mins: [
          {
            'AssignmentId': 0,
            'OWPMatchId': 1238730,
            'ParentMatchId': 1238728,
            'Bettype': 1,
            'MinorBettypeId': -2,
            'AssignmentType': 0,
            'UserId': 0,
            'Username': null,
            'AssignmentNote': null
          }
        ],
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
