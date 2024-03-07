export interface ProductModel {
  _id: string;
  name: string;
  price: number;
  categoryId: string;
  parentCategoryId: string;
  productCode: string;
  priceType: string;
  currentCaseSize: number;
  productSysCode: string;
  tkPoint: number;
  netWeight: string;
  enable: boolean;
  lastUpdatedAt: number;
  inventoryDetails: InventoryDetails[];
  categoryPrices: CategoryPrices[];
  key: number;
  isFocusedPack?: string | boolean;
}

export interface InventoryDetails {
  storeName: string;
  storeAlias: string;
  inventory: number;
  inTransit: number;
}

export interface CategoryPrices {
  productName: string;
  productCode: string;
  price: number;
  effectiveDate: string;
  custCategoryName: string;
}

export interface UpdateProduct {
  productId: string;
  name: string;
  price: number;
  productCode: string;
  productSysCode: string;
  parentCategoryId: string;
  categoryId: string;
  isFocusedPack: string | boolean | undefined;
}
