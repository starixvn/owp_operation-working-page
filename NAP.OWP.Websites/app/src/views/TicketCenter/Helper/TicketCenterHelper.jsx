import { isEqual } from 'lodash';
import { TicketCenterPageURL, MARKET } from '../const/const.json';
import { getValueHrefByReversedIndex } from '../../Shared/Utils';
import {
  getDetailSegmentUrlByEventType,
  EVENT_TYPE,
  URL
} from '../../Shared/TicketCenterPrematch/helper/helper';

const flowFromPreMatch = (userId, searchKey) => {
  return {
    Keyword: searchKey,
    ActorId: userId,
    MarketKey: MARKET[0].value
  };
};

const flowBasic = userId => {
  return {
    MarketKey: MARKET[0].value,
    ActorId: userId
  };
};

const buildValueTicketsFilter = policy => {
  const { ActorId, Username } = policy;
  const pathName = getValueHrefByReversedIndex(1);
  if (isEqual(pathName, TicketCenterPageURL.MyTicket)) {
    return flowFromPreMatch(ActorId, Username);
  }
  return flowBasic(ActorId);
};

const buildTicketTypeFilter = (parents, children) => {
  const parentOption = parents.map(({ id, name }) => ({
    value: `p-${id}`,
    title: name,
    key: `p-${id}`,
    showTitle: name
  }));

  const getParent = id => parents.find(x => x.id === id);

  const childrenOption = children.map(
    ({ parentId, subTypeId, subTypeName }) => ({
      value: `${parentId}-${subTypeId}`,
      title: subTypeName,
      key: `${parentId}-${subTypeId}`,
      pId: `p-${parentId}`,
      showTitle: `${getParent(parentId)?.name}-${subTypeName}`
    })
  );

  const emptyOption = parents.map(({ id, name }) => ({
    value: `${id}-`,
    title: `None`,
    key: `p-${id}-None`,
    pId: `p-${id}`,
    showTitle: `${name}-None`
  }));

  return { parentOption, childrenOption, emptyOption };
};

export {
  buildValueTicketsFilter,
  getDetailSegmentUrlByEventType,
  buildTicketTypeFilter,
  EVENT_TYPE,
  URL
};
