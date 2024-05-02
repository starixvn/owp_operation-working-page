import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildRequestURL } from '../../../../../Shared/Service/serviceHelper';
import { get } from '../../../../../Shared/Service/Service';
import { TOption } from '../EditType';
import Converter from '../../../../../Shared/Converter';
import { rebuildLeagueGroupOption } from '../../../../helper/commonHelper';

const getLeagueGroupOptionsThunk = createAsyncThunk<TOption[]>(
  'leagueGroup/query',
  async () => {
    const url = buildRequestURL('league-management', 'get-league-group');
    const data = await get({ url });

    const options = Converter.convertResourceToOptions(data.data);
    const leagueGroupOptionIncludeNoneItem = rebuildLeagueGroupOption(options);
    return leagueGroupOptionIncludeNoneItem as TOption[];
  }
);

export { getLeagueGroupOptionsThunk };
