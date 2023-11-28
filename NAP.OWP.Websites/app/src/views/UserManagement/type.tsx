type TUserDetail = {
  dataSource: Array<{
    OldUserName: string,
    NewUserName: string
  }>,
  hasWrite: boolean,
  onToggle(value: confirmSyncUserEnum): void
};

enum confirmSyncUserEnum {
  save = 'save',
  cancel = 'cancel'
};


export {
  TUserDetail,
  confirmSyncUserEnum
};
