import { useEffect, useState } from 'react';
import { getDashboardData } from '../services/User';
import {
  DasboardEntityCountsReponseModel,
  DasboardEntityCountsResponseBody,
} from '../models/DasboardEntityCountsReponseModel';

export const useMetrics = () => {
  const [entityCountsInfo, setEntityCountsInfo] =
    useState<DasboardEntityCountsResponseBody>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserDashboardData = async () => {
      try {
        setIsLoading(true);
        const response: DasboardEntityCountsReponseModel =
          await getDashboardData();
        const data = (response && response?.data?.body) || {};
        if (data) {
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
    isLoading,
  };
};
