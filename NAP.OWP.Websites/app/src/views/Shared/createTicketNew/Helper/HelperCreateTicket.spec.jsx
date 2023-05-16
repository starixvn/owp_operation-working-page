import {
  getRecipientDefaultBySubType,
  getSubTypeByType,
  saveFileToBackEnd
} from './HelperCreateTicket';
import Service from '../Service';
import Axios from 'axios';

jest.mock('../Service');
jest.mock('axios');
const recipient = {
  data: [
    {
      ticketTypeRecipientId: 1,
      recipientId: 1,
      recipientType: 1,
      recipientName: 'sa',
      recipientNickname: 'sa_nick'
    }
  ]
};

const responseDataSubType = {
  data: [
    {
      subTypeId: 11,
      subTypeName: 'Verify League M UPDATE11'
    }
  ]
};
describe('Helper under test', () => {
  it('getRecipientDefaultByType', async () => {
    Service.recipientBySubType.mockResolvedValue(recipient);
    const result = await getRecipientDefaultBySubType(1);
    expect(result).toEqual(recipient.data);
  });
  it('getSubTypeByType', async () => {
    Service.getSubType.mockResolvedValue(responseDataSubType);
    const result = await getSubTypeByType(1);
    expect(result).toEqual(responseDataSubType.data);
  });
  it('saveFileToBackEnd', async () => {
    const file = new File([new ArrayBuffer(6000000)], 'file.abc');
    Axios.post.mockResolvedValue({ data: 1 });
    const result = await saveFileToBackEnd(file);
    expect(result).toEqual(1);
  });
});
