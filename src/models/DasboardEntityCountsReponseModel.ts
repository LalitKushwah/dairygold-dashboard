export interface DasboardEntityCountsReponseModel {
  data: DasboardEntityCountsReponseModelData;
}
interface DasboardEntityCountsReponseModelData {
  body: DasboardEntityCountsResponseBody;
  status: number;
}

export interface LabelMapping {
  customerCount: string;
  salesmanCount: string;
  salesmanagerCount: string;
  parentCategoryCount: string;
  productCount: string;
}

export type PieChartDataType = {
  id: string;
  label: string;
  value: string;
  color?: string;
};

export interface DasboardEntityCountsResponseBody {
  customerCount: number;
  salesmanCount: number;
  salesmanagerCount: number;
  parentCategoryCount: number;
  productCount: number;
  todayOrderCount: number;
  weekOrderCount: number;
  monthOrderCount: number;
  totalOrderCount: number;
}
