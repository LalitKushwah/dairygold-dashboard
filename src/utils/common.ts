import { UserData } from '../models/UserLoginModel';

export const deepClone = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getLoggedInUser = (): UserData => {
  const user: any = localStorage.getItem(loggedInUser);
  if (user) {
    return JSON.parse(user);
  }
  return {} as UserData;
};

export const HTTP_METHOD = {
  PUT: 'PUT',
  GET: 'GET',
  POST: 'POST',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

export enum UserRole {
  ADMIN = 'ADMIN',
  ADMINHO = 'ADMINHO',
  SALESMAN = 'SALESMAN',
  SALESMANAGER = 'SALESMANAGER',
}

// Define enum for CRUD operations
export enum CrudOperation {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  ALL = 'all',
}

// Define CRUD permissions for user roles
export const crudPermissions: CrudPermission = {
  [UserRole.ADMINHO]: [
    CrudOperation.ALL,
  ],
  [UserRole.ADMIN]: [
    CrudOperation.CREATE,
    CrudOperation.READ,
    CrudOperation.UPDATE,
  ],
  [UserRole.SALESMAN]: [],
  [UserRole.SALESMANAGER]: [],
};

export interface CrudPermission {
  ADMIN?: string[];
  ADMINHO?: string[];
  SALESMAN?: string[];
  SALESMANAGER?: string[];
  CUSTOMER?: string[];
  MCE?: string[];
  MCM?: string[];
  PRICE_EXECUTIVE?: string[];
}

export const loggedInUser = 'loggedInUser';
export const LIMIT = 10;

export const formatTimestampToReadableDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString();
};
