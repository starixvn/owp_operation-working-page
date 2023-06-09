type SubType = {
  subTypeId: number;
  subTypeName: string;
};

type SubTypeOption = {
  value: number | string;
  label: string;
  key?: string;
  disabled?: boolean;
};

type StatusOption = {
  value: string;
  label: string;
};

type Recipient = {
  groupName: string | null;
  nickName: string;
  recipientId: number;
  recipientType: number;
  userName: string | null;
};

type LogWorkProps = {
  creatorInfo: Recipient;
};

type MatchInfo = {
  leagueName: string;
  awayName: string;
  homeName: string;
  koTime: Date;
};
