import { deepClone } from '../utils/common';
import { Api } from './Api';

interface ParentCategoryaParams {
  skip: number;
  limit: number;
  requestType?: string;
  isCapturingFlow?: boolean;
  search?: string;
}

export const fetchParentCategories = (
  query: ParentCategoryaParams
): Promise<any> => {
  const END_POINT = '/category/list/parent';
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery });
  } catch (ex) {
    throw new Error();
  }
};
