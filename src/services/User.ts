import { DasboardEntityCountsReponseModel } from '../models/DasboardEntityCountsReponseModel';
import { AddUser, UpdateUser } from '../models/UserModel';
import { HTTP_METHOD, deepClone } from '../utils/common';
import { Api, ApiWithoutToken } from './Api';

export const authenticate = async (userLoginId: string, password: string) => {
  const END_POINT = '/user/authenticate';
  try {
    const repsonse = await ApiWithoutToken(END_POINT, {
      method: 'POST',
      data: {
        userLoginId,
        password,
      },
    });
    return repsonse.data;
  } catch (ex) {
    console.error(ex);
    throw new Error();
  }
};

export const getDashboardData =
  async (): Promise<DasboardEntityCountsReponseModel> => {
    try {
      const END_POINT = '/user/admin/dashboardinfo';
      return Api(END_POINT);
    } catch (ex) {
      console.error(ex);
      throw new Error();
    }
  };

export const getUserDashboard = (externalId: string) => {
  try {
    const END_POINT = `user/get/dashboard?externalId=${externalId}`;
    return Api(END_POINT);
  } catch (ex) {
    throw new Error();
  }
};

export const getSalesmansList = async (): Promise<any> => {
  try {
    const END_POINT = '/user/list/all/salesman';
    return Api(END_POINT);
  } catch (ex) {
    throw new Error();
  }
};

export const getSalesmansListWithPagination = async (
  query: any
): Promise<any> => {
  try {
    const END_POINT = 'user/list/salesman';
    return Api(END_POINT, { params: query });
  } catch (ex) {
    throw new Error();
  }
};

export const getCustomersList = async (query: any): Promise<any> => {
  try {
    const END_POINT = 'user/list/customer';
    return Api(END_POINT, { params: query });
  } catch (ex) {
    throw new Error();
  }
};

interface AssociateSalesmanParams {
  externalId: string;
  province?: string;
  searchKey?: string;
  requestType?: string;
  skip?: string;
  limit?: string;
}

export const getAssociatedSalesmansList = async (
  query: AssociateSalesmanParams
): Promise<any> => {
  const clonnedQuery = deepClone(query);
  clonnedQuery['requestType'] = 'dashboard';
  try {
    const END_POINT = 'user/sm/associated/salesman/';
    return Api(END_POINT, { params: clonnedQuery });
  } catch (ex) {}
};

export const getProvinceList = async (): Promise<any> => {
  try {
    const END_POINT = 'user/provinces/fetch';
    return Api(END_POINT);
  } catch (ex) {}
};

export const resetPassword = async (_id: string) => {
  const END_POINT = `user/resetPassword/${_id}`;
  return Api(END_POINT, {
    method: 'POST',
  });
};

export const deleteUser = async (_id: string) => {
  const END_POINT = `user/delete/${_id}`;
  return Api(END_POINT, {
    method: 'DELETE',
  });
};

export const updateUserStatus = async (updateStatus: {
  externalId: string;
  userLoginId: string;
  isActive: boolean;
  userType: string;
}) => {
  const END_POINT = 'user/status/update';
  return Api(END_POINT, {
    method: 'PUT',
    data: updateStatus,
  });
};

export const fetchProvince = async () => {
  const END_POINT = 'user/provinces/fetch';
  return Api(END_POINT, {
    method: HTTP_METHOD.GET,
  });
};

export const createUser = async (user: AddUser) => {
  const END_POINT = 'user';
  return Api(END_POINT, {
    method: HTTP_METHOD.POST,
    data: user,
  });
};

export const updateUser = async (toBeUpdate: UpdateUser) => {
  const END_POINT = 'user/update/user';
  return Api(END_POINT, {
    method: HTTP_METHOD.POST,
    data: toBeUpdate,
  });
};
