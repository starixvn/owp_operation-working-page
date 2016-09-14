import dayjs from 'dayjs';
import { timeLineColumn, startHour, startMinute } from '../../const/Const.json';
const getCurrentTimeLine = (filterDate: Date, koTime: Date) => {
  const currentDate = dayjs(koTime);
  const timeStartDefault = dayjs(filterDate)
    .set('hour', startHour)
    .set('minute', startMinute);
  const hourDiff = currentDate.diff(timeStartDefault, 'hour');
  return timeLineColumn.find(x => x.timeRange === hourDiff);
};

export { getCurrentTimeLine };
