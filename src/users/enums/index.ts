export enum UserRole {
  SuperAdmin = 'SUPER_ADMIN',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  Customer = 'USER',
}

export enum Gender {
  Man = 'Man',
  Woman = 'Woman',
}

export enum UserState {
  PENDING = 0,
  NORMAL = 1,
  SUSPEND = 2,
  DELETED = 9,
}

export const Search_Limit_Count = '18';
