import { createAsyncThunk } from '@reduxjs/toolkit';
import { post, get } from '../../../ImportPrematchHelperNative';
import {
  QUERYDELETELEAGUERECOVERAPIKEY,
  URLQUERYLEAGUEBYID,
  URLQUERYASSIGNEDLEAGUEID,
  simpleApiUpdateUrl
} from '../../../const/const';

const restoreDeletedLeague = createAsyncThunk(
  'delete/restoreDeletedLeague',
  async (preMatchLeagueId, { getState }) => {
    const { startTimeOriginal } = getState().header;
    const restore = {
      url: simpleApiUpdateUrl,
      apiKey: QUERYDELETELEAGUERECOVERAPIKEY,
      PreMatchLeagueId: preMatchLeagueId
    };
    const queryObject = {
      PreMatchLeagueId: preMatchLeagueId,
      url: URLQUERYLEAGUEBYID,
      StartTime: startTimeOriginal || null
    };
    const responseRestore = await post(restore);
    if (responseRestore.status === 200) {
      const responseQueryObject = await post(queryObject);
      return responseQueryObject.data;
    }
    return null;
  }
);

const getShiftByDateAndEmployee = createAsyncThunk(
  'dayShift/getShiftByDateAndEmployee',
  async modelFilter => {
    const response = await post(modelFilter);
    return response.data;
  }
);
const getShiftByDateAndEmployeeWhenChat = createAsyncThunk(
  'dayShift/getShiftByDateAndEmployeeWhenChat',
  async modelFilter => {
    const response = await post(modelFilter);
    return response.data;
  }
);

const getAssignedLeagueId = createAsyncThunk(
  'dayShift/getAssignedLeagueId',
  async actorId => {
    const resp = await get({
      url: URLQUERYASSIGNEDLEAGUEID,
      actorId
    });
    return resp.data;
  }
);

export {
  restoreDeletedLeague,
  getShiftByDateAndEmployee,
  getShiftByDateAndEmployeeWhenChat,
  getAssignedLeagueId
};
