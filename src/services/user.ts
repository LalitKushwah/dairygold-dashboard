import { DasboardEntityCountsReponseModel } from '../models/DasboardEntityCountsReponseModel';
import { deepClone } from '../utils/common';
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
