import { deepClone } from '../utils/common';
import { Api } from './Api';

interface ParentCategoryaParams {
  skip: number;
  limit: number;
  requestType?: string;
  isCapturingFlow?: boolean;
  search?: string;
}

interface ChildCategoryaParams {
  skip: number;
  limit: number;
  requestType?: string;
  isCapturingFlow?: boolean;
  search?: string;
}

interface CategoryByExecutive {
  executiveCode: string;
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

export const fetchChildCategories = (
  query: ChildCategoryaParams,
  parentCategoryId: string
): Promise<any> => {
  const END_POINT = `/category/list/child/${parentCategoryId}`;
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery });
  } catch (ex) {
    throw new Error();
  }
};

export const fetchCategoryByExecutive = (query: CategoryByExecutive) => {
  const END_POINT = `/user/get/customer/category`;
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery });
  } catch (ex) {
    throw new Error();
  }
};
