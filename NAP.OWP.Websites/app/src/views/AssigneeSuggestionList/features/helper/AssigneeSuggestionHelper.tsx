import dayjs from 'dayjs';
import { timeLineColumn, startHour, startMinute } from '../../const/Const.json';
import {
  TAssigneeSuggestion,
  TMatchInfo,
  UserWorkingSchedule
} from '../TypeNative';

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

const searchAssignee = (assignees: UserWorkingSchedule[], keyword: string) =>
  assignees.filter(x => {
    const normalizedKeyword = keyword.toLowerCase().trim();
    return [
      x.userInfo?.username,
      x.userInfo?.levelLabel,
      x.userInfo?.mainBetType,
      x.userInfo?.maxMultipleGames
    ].some(prop => prop?.toLowerCase().includes(normalizedKeyword));
  });

const isShowPartially = (matchInfo: TMatchInfo) =>
  !matchInfo.leagueName.includes('SABA ');

const SearchAssigneeByKeyword = (
  data: TAssigneeSuggestion,
  keyword: string
) => {
  return {
    ...data,
    fullyAvailable: searchAssignee(data.fullyAvailable, keyword),
    partiallyAvailable: searchAssignee(data.partiallyAvailable, keyword),
    busy: searchAssignee(data.busy, keyword)
  };
};

export {
  getCurrentTimeLine,
  getTotalRecords,
  SearchAssigneeByKeyword,
  isShowPartially
};
