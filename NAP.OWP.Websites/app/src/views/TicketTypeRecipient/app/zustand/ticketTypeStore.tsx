import { create } from 'zustand';
import { Recipient, SubType } from '../../features/TypeNative';
import axios from 'axios';

import {
  netCoreURL,
  netFwURL,
  saveTicketTypeRecipientsRoute
} from '../../Const.json';

type ticketTypeState = {
  recipients: Array<Recipient>,
  subtypes: Array<SubType>,
  setRecipient: (recipients: Array<Recipient>) => void,
  setSubtypes: (subtypes: Array<SubType>) => void,
  saveData: (ticketTypeId: Required<number>) => Promise<boolean>
};

const useStore = create<ticketTypeState>((set, get) => ({
  recipients: [],
  subtypes: [],
  setRecipient: (recipients: Array<Recipient>) => set({
    recipients
  }),
  setSubtypes: (subtypes: Array<SubType>) => set({
    subtypes
  }),
  saveData: async (ticketTypeId: Required<number>): Promise<boolean> => {
    const url =
      process.env.NODE_ENV === 'development'
        ? `${netCoreURL}/${saveTicketTypeRecipientsRoute}`
        : `${window.netCoreRootUrl}/${netFwURL}/${saveTicketTypeRecipientsRoute}`;


    const { recipients, subtypes } = get();

    if (subtypes.some(subtype => !subtype.subtypeName)) {
      return false;
    }
    const postModel = {
      ticketTypeId,
      recipients,
      subtypes
    };
    await axios.post(url, postModel);
    return true;
  },
}));

export default useStore;


