import { Option } from "../Shared/MultipleSelection/type";

type TUserDetail = {
  dataSource: Array<{
    OldUserName: string,
    NewUserName: string
  }>,
  hasWrite: boolean,
  onToggle(value: confirmSyncUserEnum): void
};

type TRefResource = {
  resourceId: number,
  value: string,
  name: string
}

type TOptionsResponse = {
  roles: Array<TRefResource>,
  sections: Array<TRefResource>,
  departments: Array<TRefResource>,
  categories: Array<TRefResource>,
  locationCodes: Array<TRefResource>,
  levels: Array<TRefResource>,
  languages: Array<TRefResource>,
  userGroups: Array<TRefResource>
};

type TOptions = {
  roles: Array<Option>,
  sections: Array<Option>,
  departments: Array<Option>,
  categories: Array<Option>,
  locationCodes: Array<Option>,
  levels: Array<Option>,
  languages: Array<Option>,
  userGroups: Array<Option>
};

type TFilter = {
  queryOptionsStatus: string,
  filterValue: {
    userName: string,
    role: Array<Option>,
    section: Array<Option>,
    department: Array<Option>,
    category: Array<Option>,
    locationCode: Array<Option>,
    level: Array<Option>,
    language: Array<Option>,
    userGroup: Array<Option>,
  }
  options: TOptions,
  queryOptions(): Promise<void>
}

type TPolicy = {
  isRead: boolean,
  isHost: boolean
}

type TPermission = {
  queryPermissionStatus: string,
  permissions: {
    userManagement: TPolicy,
    userManagementOwnSection: TPolicy,
    userManagementAllSections: TPolicy,
  },
  queryPermissions(): Promise<void>
};

enum confirmSyncUserEnum {
  save = 'save',
  cancel = 'cancel'
};


export {
  TUserDetail,
  confirmSyncUserEnum,
  TFilter,
  TPermission,
  TPolicy,
  TOptionsResponse,
  TRefResource,
  TOptions
};
