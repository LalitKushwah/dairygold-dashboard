import { deepClone } from '../utils/common';
import { Api } from './Api';

interface ParentCategoryaParams {
  skip: number;
  limit: number;
  requestType?: string;
  isCapturingFlow?: boolean;
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

interface ChildCategoryaParams {
  skip: number;
  limit: number;
  isCapturingFlow?: boolean;
}

export const fetchChildCategories = (
  query: ChildCategoryaParams, parentCategoryId: string
): Promise<any> => {
  const END_POINT = `/category/list/child/${parentCategoryId}`;
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery });
  } catch (ex) {
    throw new Error();
  }
};
