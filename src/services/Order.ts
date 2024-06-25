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

export const fetchOrderDetail = (id: string) => {
  if (!id) return;
  const END_POINT = `/order/detail/${id}`;
  try {
    return Api(END_POINT);
  } catch (ex) {
    throw new Error();
  }
};

interface IPriceCapturing {
  fromDate: string;
  throughDate: string;
  externalId: string;
  reportType?: string;
}

export const fetchPriceCapturingReport = (query: IPriceCapturing) => {
  const END_POINT = '/order/captured/data';
  const clonnedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: clonnedQuery });
  } catch (ex) {
    throw new Error();
  }
};
