import dayjs from 'dayjs';

const checkAllFilterCondition = (filterModel, ticketInfo) => {
  return (
    checkFilterDate(filterModel, ticketInfo) &&
    checkFilterEvent(filterModel, ticketInfo) &&
    checkFilterTicketSubTypeId(filterModel, ticketInfo) &&
    checkFilterStatus(filterModel, ticketInfo)
  );
};

const checkFilterDate = (filterModel, ticketInfo) => {
  const lastCommentDate = dayjs(ticketInfo.lastCommentDate);
  const fromDateFilter = dayjs(filterModel.FromDateFilter);
  let toDateFilter = dayjs(filterModel.ToDateFilter);
  toDateFilter = toDateFilter.endOf('day');
  return lastCommentDate >= fromDateFilter && lastCommentDate <= toDateFilter;
};

const checkFilterEvent = (filterModel, ticketInfo) => {
  const { Keyword } = filterModel;

  if (isUndefined(Keyword)) {
    return true;
  }

  const fieldsToCheck = [
    'awayName',
    'homeName',
    'eventName',
    'subject',
    'leagueName',
    'owpLeagueName'
  ];

  return fieldsToCheck.some(field =>
    ticketInfo[field]?.toLowerCase().includes(Keyword.toLowerCase())
  );
};

const checkFilterTicketSubTypeId = (filterModel, ticketInfo) => {
  const listSubTypeIdFilterModel = filterModel.TicketTypeId.split(',');
  const ticketSubTypeId = `${ticketInfo.ticketType}-${
    ticketInfo.ticketSubTypeId || ''
  }`;
  return listSubTypeIdFilterModel.some(x => x === ticketSubTypeId);
};

const checkFilterStatus = (filterModel, ticketInfo) => {
  return filterModel.TicketStatuses.includes(ticketInfo.ticketStatus);
};

export { checkAllFilterCondition };
