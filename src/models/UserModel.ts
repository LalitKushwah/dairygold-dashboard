export interface AddUser {
  userType: string;
  userLoginId: string;
  name: string;
  password: string;
  channel: string;
  externalId: string;
  province: string;
  country: string;
  lastUpdatedAt: number;
}

export interface UpdateUser {
  externalId: string;
  name: string;
  province: string;
  userType?: string;
}
