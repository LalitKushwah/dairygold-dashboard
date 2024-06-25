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
