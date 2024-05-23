import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../../../Shared/Service/Service';
import { TQuickMessage } from '../../../Type';
import { urlGetQuickMessage, urlSaveQuickMessage } from '../../../const/const';

const queryProfileThunk = createAsyncThunk<TQuickMessage[]>(
  'quickMessage/query',
  async () => {
    const response = await get({ url: urlGetQuickMessage });
    return response.data;
  }
);

const saveProfileThunk = createAsyncThunk<number, TQuickMessage>(
  'quickMessage/save',
  async model => {
    const response = await post({ url: urlSaveQuickMessage, ...model });
    return response.status;
  }
);

export { queryProfileThunk, saveProfileThunk };
