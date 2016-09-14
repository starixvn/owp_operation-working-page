import { useEffect } from 'react';
import useStableDispatch from '../../../Shared/customHook/useStableDispatch';
import { useSelector } from 'react-redux';
import { LASTUPDATED, simpleApiQueryUrl } from '../../const/const';
import { getLastUpdate } from '../header/headerSlice';

const useGetHeaderInfo = (isDay = false) => {
  const stableDispatch = useStableDispatch();
  const filterDate = useSelector(state => state.filter.filterDate);
  const headerState = useSelector(state => state.header);
  const { UpdatedTime, Username } = headerState.info;

  useEffect(() => {
    const model = {
      url: simpleApiQueryUrl,
      apiKey: LASTUPDATED.apiKey,
      isDay
    };
    stableDispatch(getLastUpdate(model));
  }, [isDay, stableDispatch]);

  const props = {
    filterDate,
    headerState,
    updateTime: UpdatedTime,
    updateBy: Username,
    shiftTime: filterDate ? new Date(filterDate) : null
  };
  return props;
};

export default useGetHeaderInfo;
