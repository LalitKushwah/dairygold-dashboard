export interface ProductModel {
  productId: string;
  quantity: number;
  price: number;
  tkPoint: number;
  netWeight: number;
  parentCategoryId: string;
  productDetail: ProductDetail;
}

interface ProductDetail {
  _id: string;
  name: string;
  price: number;
  productCode: string;
  productSysCode: string;
}
