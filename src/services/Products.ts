import { ProductModel, UpdateProduct } from '../models/ProductModel';
import { HTTP_METHOD } from '../utils/common';
import { Api } from './Api';

interface fetchProductsParams {
  skip: number;
  limit: number;
  requestType: string;
  userType: string;
  search?: string;
}
export const fetchProducts = (
  query: fetchProductsParams,
  categoryId: string
) => {
  const END_POINT = `/product/list/category/${categoryId}`;
  try {
    return Api(END_POINT, { params: query });
  } catch (ex) {
    throw new Error();
  }
};

export const addProduct = (newProduct: ProductModel) => {
  const END_POINT = '/product';
  try {
    return Api(END_POINT, { method: HTTP_METHOD.POST, data: newProduct });
  } catch (error) {
    throw new Error();
  }
};

export const updateProduct = (toBeUpdate: UpdateProduct) => {
  const END_POINT = '/product/update';
  try {
    return Api(END_POINT, { method: HTTP_METHOD.POST, data: toBeUpdate });
  } catch (error) {
    throw new Error();
  }
};

export const deleteProduct = (productId: string) => {
  const END_POINT = `/product/delete/${productId}`;
  try {
    return Api(END_POINT, { method: HTTP_METHOD.DELETE });
  } catch (error) {
    throw new Error();
  }
};
