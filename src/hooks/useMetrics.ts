import { useEffect, useState } from 'react';
import { getDashboardData } from '../services/user';
import {
  DasboardEntityCountsReponseModel,
  DasboardEntityCountsResponseBody,
  LabelMapping,
  PieChartDataType,
} from '../models/DasboardEntityCountsReponseModel';

const labelMapping: LabelMapping = {
  customerCount: 'Customer',
  salesmanCount: 'Salesman',
  salesmanagerCount: 'SalesManager',
  parentCategoryCount: 'Parent Category',
  productCount: 'Products',
};

export const useMetrics = () => {
  const [entityCountsInfo, setEntityCountsInfo] =
    useState<DasboardEntityCountsResponseBody>();
  const [transformedDataForChart, setTransformedDataForChart] =
    useState<PieChartDataType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserDashboardData = async () => {
      try {
        setIsLoading(true);
        const response: DasboardEntityCountsReponseModel =
          await getDashboardData();
        const data = (response && response?.data?.body) || {};
        if (data) {
          const metrics: PieChartDataType[] = [];
          Object.keys(data).forEach((key: string) => {
            // @ts-ignore
            if (key && labelMapping[key]) {
              const obj = {
                id: key,
                // @ts-ignore
                label: labelMapping[key],
                // @ts-ignore
                value: data[key],
              };
              metrics.push(obj);
            }
          });
          setTransformedDataForChart(metrics);
          setEntityCountsInfo(response.data.body);
          setIsLoading(false);
        }
      } catch (ex) {
        console.log(ex);
        setIsLoading(false);
        throw new Error();
      }
    };
    getUserDashboardData();
  }, []);

  return {
    entityCountsInfo,
    transformedDataForChart,
    isLoading,
  };
};
