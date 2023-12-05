import { Option } from '../Shared/MultipleSelection/type';

type TUserDetail = {
  dataSource: Array<{
    OldUserName: string;
    NewUserName: string;
  }>;
  hasWrite: boolean;
  onToggle(value: confirmSyncUserEnum): void;
};

type TRefResource = {
  resourceId: number;
  value: string;
  name: string;
};

type TOptionsResponse = {
  roles: Array<TRefResource>;
  sections: Array<TRefResource>;
  departments: Array<TRefResource>;
  categories: Array<TRefResource>;
  locationCodes: Array<TRefResource>;
  levels: Array<TRefResource>;
  languages: Array<TRefResource>;
  userGroups: Array<TRefResource>;
};

type TOptions = {
  roles: Array<Option>;
  sections: Array<Option>;
  departments: Array<Option>;
  categories: Array<Option>;
  locationCodes: Array<Option>;
  levels: Array<Option>;
  languages: Array<Option>;
  userGroups: Array<Option>;
};
type TFilterValue = {
  userName: string;
  role: Array<Option>;
  section: Array<Option>;
  department: Array<Option>;
  category: Array<Option>;
  locationCode: Array<Option>;
};

type TFilter = {
  queryOptionsStatus: string;
  filterValue: TFilterValue;
  options: TOptions;
  queryOptions(): Promise<void>;
  setFilterValue(value: string | Array<Option>, key: keyof TFilterValue): void;
};

type TPolicy = {
  isRead: boolean;
  isHost: boolean;
};

type TPermission = {
  queryPermissionStatus: string;
  permissions: {
    userManagement: TPolicy;
    userManagementOwnSection: TPolicy;
    userManagementAllSections: TPolicy;
  };
  queryPermissions(): Promise<void>;
};

enum confirmSyncUserEnum {
  save = 'save',
  cancel = 'cancel'
}

type TUserInfo = {
  userId: number;
  userName: string;
  fullName: string;
  nickName: string;
  employeeId: string | null;
  departmentId: number | null;
  sectionId: number | null;
  sectionName: string | null;
  groupId: number | null;
  groupName: string | null;
  roleId: number | null;
  roleName: string | null;
  extension: string | null;
  phone: string | null;
  email: string | null;
  skype: string | null;
  categoryId: number | null;
  categoryName: string | null;
  locationCode: string | null;
  level: number | null;
  levelName: string | null;
  pickup: boolean;
  address: string | null;
  isSecondAccount: boolean;
  languageId: string | null;
  languages: string | null;
};

type TQueryUserInfo = {
  user: string;
  roleId: (string | number | null)[];
  SectionId: (string | number | null)[];
  DepartmentId: (string | number | null)[];
  CategoryId: (string | number | null)[];
  LocationCode: (string | number | null)[];
};

type TDataTableResponse = {
  users: Array<TUserInfo>;
  levelOfLiveTrading: Array<TRefResource>;
  levelOfLiveAssistant: Array<TRefResource>;
  levelOfOtherSection: Array<TRefResource>;
};

type TDataTable = {
  queryDataTableStatus: string;
  dataSource: TDataTableResponse;
  queryUserInfo(value: TQueryUserInfo): Promise<void>;
  updateValue(newValue: string | number, key: keyof TUserInfo, rowIndex: Required<number>): void
};

type ColumnSchema = {
  headerName: string;
  columnKey: string;
  width: number;
};
type Column = {
  headerName: string;
  columnKey: string;
};

export {
  TUserDetail,
  confirmSyncUserEnum,
  TFilter,
  TPermission,
  TPolicy,
  TOptionsResponse,
  TRefResource,
  TOptions,
  TDataTable,
  TQueryUserInfo,
  TDataTableResponse,
  ColumnSchema,
  Column,
  TUserInfo
};
