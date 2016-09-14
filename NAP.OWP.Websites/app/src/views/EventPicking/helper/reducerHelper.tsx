import TDataTable from "../types/dataTableType";
import { TNoOfferMatch } from "../types/noOfferMatchType";

const updateEntities = (entities: TDataTable[], noOfferMatch: TNoOfferMatch[]) => {
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

export {
  updateEntities
};