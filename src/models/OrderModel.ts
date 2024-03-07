import { UserData } from './UserLoginModel';

export interface OrderEntity {
  lastUpdatedAt: number;
  orderId: string;
  orderTotal: number;
  productList: OrderItem[];
  province: string;
  salesmanCode: string;
  salesmanName: string;
  status: string;
  totalNetWeight: number;
  totalQuantity: number;
  totalTkPoints: number;
  userDetail: UserData;
  userId: string;
  warehouseCode: string;
  _id: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  tkPoint: number;
  netWeight: number;
  parentCategoryId: string;
  productDetail: OrderItemDetail;
}

export interface OrderItemDetail {
  _id: string;
  name: string;
  price: number;
  productCode: string;
  productSysCode: string;
}
