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
