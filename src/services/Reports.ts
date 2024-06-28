import { deepClone } from '../utils/common';
import { Api } from './Api';

interface PriceListParams {
  categoryName: string;
}

export const downloadPriceListReport = (
  query: PriceListParams
): Promise<any> => {
  const END_POINT = '/user/download/customer/category/price/list';
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery, responseType: 'blob' });
  } catch (ex) {
    throw new Error();
  }
};

interface CheckInQueryParams {
  externalId: string;
  fromDate: string;
  toDate: string;
}

export const downloadCheckInReport = (query: CheckInQueryParams) => {
  const END_POINT = '/user/get/check/in/data';
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery, responseType: 'blob' });
  } catch (ex) {
    throw new Error();
  }
};

export const downloadStockingReport = (query: CheckInQueryParams) => {
  const END_POINT = '/order/captured/stock';
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery, responseType: 'blob' });
  } catch (ex) {
    throw new Error();
  }
};

export const downloadActivityReport = (query: CheckInQueryParams) => {
  const END_POINT = '/user/activity/report/download';
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery });
  } catch (ex) {
    throw new Error();
  }
};
