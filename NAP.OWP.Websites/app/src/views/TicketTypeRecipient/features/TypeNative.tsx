import { TicketSettingRecipient } from '../../Shared/TicketSetting/TypeNative';

type TicketType = {
  typeId: number;
  typeName: string;
};

interface Child {
  parentId: number;
  subTypeId: number;
  subTypeName: string;
}

interface SubType {
  subtypeId: number;
  typeId: number;
  subtypeName: string;
}
interface Recipient extends TicketSettingRecipient {
  ticketTypeRecipientId: number;
}

type TicketTypeRecipientDataSource = {
  ticketType: TicketType;
  recipients: Array<Recipient>;
  subtypes: Array<SubType>;
};

type CellModel = {
  dataSource: Array<TicketTypeRecipientDataSource>;
  columnKey: number;
};

export {
  CellModel,
  TicketTypeRecipientDataSource,
  Recipient,
  TicketType,
  SubType,
  Child
};
