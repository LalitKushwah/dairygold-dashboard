import { deepClone } from '../utils/common';
import { Api } from './Api';

export const fetchOrders = (query: {
  skip: number;
  limit: number;
  status?: string;
  searchKeyword?: string;
  salesmanCode?: string;
}) => {
  const END_POINT = '/order/list/';
  const clonnedQuery = deepClone(query);
  clonnedQuery['requestType'] = 'dashboard';
  try {
    return Api(END_POINT, { params: clonnedQuery });
  } catch (ex) {
    throw new Error();
  }
};
