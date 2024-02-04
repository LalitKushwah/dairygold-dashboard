import { ProductModel } from './ProductModel';
import { UserData } from './UserLoginModel';

export interface OrderEntity {
  lastUpdatedAt: number;
  orderId: string;
  orderTotal: number;
  productList: ProductModel[];
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
}
