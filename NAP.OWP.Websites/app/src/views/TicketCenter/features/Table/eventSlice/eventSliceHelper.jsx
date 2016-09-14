const filterIssueByUnreadMessageValue = state => {
  const { entitiesOrigin, isShowUnreadMessOnly } = state;
  if (isShowUnreadMessOnly) {
    return entitiesOrigin.filter(d => !d.isRead);
  }
  return entitiesOrigin;
};
const formatTicketTypeOption = ticketTypes =>
  ticketTypes.map(({ id: value, name: label }) => ({
    value,
    label
  }));

export { filterIssueByUnreadMessageValue, formatTicketTypeOption };
