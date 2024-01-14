export interface UserLoginModel {
  body: UseBodyData[];
}

interface UseBodyData {
  _id: string;
  lastUpdatedAt: Date;
  name: string;
  userLoginId: string;
  userType: string;
  country: string;
  province: string;
  externalId: string;
  associatedStore: string[];
  associatedSalesmanList: string[];
  isAuthorized: boolean;
  isActive: boolean;
  token: string;
}
