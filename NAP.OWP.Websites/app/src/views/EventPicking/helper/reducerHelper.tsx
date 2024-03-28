import { formatTime } from "../../Shared/DateTime/dateTimeHelper";
import { TConfirmed } from "../types/confirmed";
import TDataTable, { TMultipleFilter } from "../types/dataTableType";
import { TNoOfferMatch } from "../types/noOfferMatchType";
import { uniqBy } from 'lodash';
import { COLUMN_KEY } from '../table/TableSchema.json';


const updateNoOfferMatch = (entities: TDataTable[], noOfferMatch: TNoOfferMatch[]) => {
  entities.forEach(element => {
    const noOfferMatchTarget = noOfferMatch.find(
      x =>
        x.infoSiteMatchId === element.infoSiteMatchId &&
        x.childMatchId === element.childMatchId
    );

    if (noOfferMatchTarget) {
      element.isNoOffer = noOfferMatchTarget.isNoOffer;
    }
  });
};

const updateConfirmedMatch = (entities: TDataTable[], confirmInfo: TConfirmed) => {
  entities.forEach(element => {
    if (confirmInfo.infoSiteMatchIds.some(
      id =>
        id === element.infoSiteMatchId
    )) {
      element.isCheck = confirmInfo.confirmed;
    }
  });
};

const buildKoOptions = (entities: TDataTable[]) =>
  uniqBy(
    entities.map(m => ({ value: m.eventDateTime.toString(), label: formatTime(m.eventDateTime, 'minute', 'hh:mm A') }))
      .map(o => ({
        value: o.value,
        label: o.label ?? ''
      })), i => i.label);

const buildMbOptions = (entities: TDataTable[]) => uniqBy(
  [...entities].sort((first, second) => first.maxBetHDPNumber - second.maxBetHDPNumber)
    .map(m => m.maxBetHDP)
    .map(o => ({
      value: o ?? '',
      label: o ?? ''
    })), i => i.label);

const buildMultipleFilterDefault = (entities: TDataTable[]) => {
  const koTimeOptions = buildKoOptions(entities);
  const mbOptions = buildMbOptions(entities);
  return [{
    columnKey: COLUMN_KEY.KO_TIME,
    isFilter: false,
    selected: koTimeOptions,
    options: koTimeOptions
  }, {
    columnKey: COLUMN_KEY.MB,
    isFilter: false,
    selected: mbOptions,
    options: mbOptions
  }];
};

export {
  updateNoOfferMatch,
  updateConfirmedMatch,
  buildMultipleFilterDefault
};
