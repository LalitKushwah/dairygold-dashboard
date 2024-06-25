import { UserData } from '../models/UserLoginModel';

export const GLOBAL_DATA__FETCH_LIMIT = 10;

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

export const downloadPdf = (data: any, fileName: string) => {
  // Create a Blob from the response data
  const pdfBlob = new Blob([data], { type: 'application/pdf' });

  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(pdfBlob);

  // Create a temporary <a> element to trigger the download
  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute('download', fileName || 'Report'); // Set the desired filename for the downloaded file

  // Append the <a> element to the body and click it to trigger the download
  document.body.appendChild(tempLink);
  tempLink.click();

  // Clean up the temporary elements and URL
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(url);
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
  [UserRole.ADMINHO]: [CrudOperation.ALL],
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

export const getMonthNames = (withAll: boolean) => {
  const list = [
    {
      label: 'January',
      value: 'January',
    },
    {
      label: 'February',
      value: 'February',
    },
    {
      label: 'March',
      value: 'March',
    },
    {
      label: 'April',
      value: 'April',
    },
    {
      label: 'May',
      value: 'May',
    },
    {
      label: 'June',
      value: 'June',
    },
    {
      label: 'July',
      value: 'July',
    },
    {
      label: 'August',
      value: 'August',
    },
    {
      label: 'September',
      value: 'September',
    },
    {
      label: 'October',
      value: 'October',
    },
    {
      label: 'November',
      value: 'November',
    },
    {
      label: 'December',
      value: 'December',
    },
  ];
  if (withAll) {
    return [{ label: 'All', value: 'all' }, ...list];
  }
  return list;
};
