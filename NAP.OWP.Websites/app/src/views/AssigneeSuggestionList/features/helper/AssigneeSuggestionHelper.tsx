import dayjs from 'dayjs';
import { timeLineColumn, startHour, startMinute } from '../../const/Const.json';
import { TAssigneeSuggestion } from '../TypeNative';
const getCurrentTimeLine = (filterDate: Date, koTime: Date) => {
  const currentDate = dayjs(koTime);
  const timeStartDefault = dayjs(filterDate)
    .set('hour', startHour)
    .set('minute', startMinute);
  const hourDiff = currentDate.diff(timeStartDefault, 'hour');
  return timeLineColumn.find(x => x.timeRange === hourDiff);
};

const getTotalRecords = ({
  fullyAvailable,
  partiallyAvailable,
  busy
}: TAssigneeSuggestion) =>
  fullyAvailable.length + partiallyAvailable.length + busy.length;

export { getCurrentTimeLine, getTotalRecords };
