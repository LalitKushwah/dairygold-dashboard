import { deepClone } from '../utils/common';
import { Api } from './Api';

interface IHoliday {
  skip: number;
  limit: number;
  month: string;
}

export const fetchHolidays = (query: IHoliday): Promise<any> => {
  const END_POINT = `/user/get/holiday`;
  const parsedQuery = deepClone(query);
  try {
    return Api(END_POINT, { params: parsedQuery });
  } catch (ex) {
    throw new Error();
  }
};
