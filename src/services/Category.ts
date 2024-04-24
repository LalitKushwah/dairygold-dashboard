import { Category } from '../models/CategoryModel';
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


interface ChildCategoryaParams {
  skip: number;
  limit: number;
  requestType?: string;
  isCapturingFlow?: boolean;
  search?: string;
}

export const fetchChildCategories = (
  query: ChildCategoryaParams
): Promise<any> => {
  const END_POINT = '/category/list/child';
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery });
  } catch (ex) {
    throw new Error();
  }
};

export const deleteParentCategories = async (_id: string) => {
  const END_POINT = `/category/delete/${_id}`;
  return Api(END_POINT, {
    method: 'DELETE',
  });
};

export const updateParentCategories = async (_id:String,toBeUpdate: Category) => {
  const END_POINT = `/category/update/${_id}`;
  return Api(END_POINT, {
    method: 'PUT',
    data: toBeUpdate,
  });
};

export const createCategory = async (category: Category) => {
  const END_POINT = '/category';
  return Api(END_POINT, {
    method: 'POST',
    data: category,
  });
}; 