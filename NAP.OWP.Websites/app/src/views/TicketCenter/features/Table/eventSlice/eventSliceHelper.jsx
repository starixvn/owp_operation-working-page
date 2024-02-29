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

const sortTickets = entities => {
  entities.sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1;
    } else {
      return new Date(b.lastCommentDate) - new Date(a.lastCommentDate);
    }
  });
};

export { filterIssueByUnreadMessageValue, formatTicketTypeOption, sortTickets };
