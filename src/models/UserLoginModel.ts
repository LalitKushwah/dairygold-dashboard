export interface UserLoginModel {
  body: UserData[];
}

export interface UserData {
  _id: string;
  lastUpdatedAt: number;
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
  channel?: string;
  // below values are for dropdown used in home page
  label: string;
  value: string;
}

export const getEmptyUserStructure = (): UserData => {
  return {
    _id: '',
    lastUpdatedAt: Date.now(),
    name: '',
    userLoginId: '',
    userType: '',
    country: '',
    province: '',
    externalId: '',
    associatedStore: [],
    associatedSalesmanList: [],
    isAuthorized: false,
    isActive: false,
    token: '',
    channel: 'string',
    label: '',
    value: '',
  };
};

export interface UserDashboardFields {
  _id: string;
  userType: string;
  customerCode: string;
  currentOutStanding: number;
  thirtyDaysOutStanding: number;
  creditLimit: number;
  targettotal: number;
  achievetotal: number;
  ftdtotal: number;
  lmtdtotal: number;
  lymtdtotal: number;
  landingtotal: number;
  lastUpdatedAt: number;
}

export interface TgtAchFields {
  target: number;
  achieve: number;
  achievedPercentage: number;
  balanceToDo: number;
  creditLimit: number;
  currentOutStanding: number;
  thirtyDaysOutStanding: number;
  availableCreditLimit: number;
  lmtd: number;
  lymtd: number;
  lmtdGrowthPercentage: number;
  lymtdGrowthPercentage: number;
  ftd: number;
  landing?: number;
}

export enum UserType {
  ADMIN_HO = 'ADMINHO',
}
