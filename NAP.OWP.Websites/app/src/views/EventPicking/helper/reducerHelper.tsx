import { formatTime } from "../../Shared/DateTime/dateTimeHelper";
import { TConfirmed } from "../types/confirmed";
import TDataTable from "../types/dataTableType";
import { TNoOfferMatch } from "../types/noOfferMatchType";
import { uniqBy } from 'lodash';
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
    entities.map(m => formatTime(m.eventDateTime, 'minute', 'hh:mm A'))
      .map((o, index) => ({
        value: index,
        label: o ?? ''
      })), i => i.label);

const buildMbOptions = (entities: TDataTable[]) => uniqBy(
  [...entities].sort((first, second) => first.maxBetHDPNumber - second.maxBetHDPNumber)
    .map(m => m.maxBetHDP)
    .map((o, index) => ({
      value: index,
      label: o ?? ''
    })), i => i.label);

export {
  updateNoOfferMatch,
  updateConfirmedMatch,
  buildKoOptions,
  buildMbOptions
};
