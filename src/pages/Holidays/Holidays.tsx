import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import NavBar from '../../common/NavBar/NavBar';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import Filters from './Filters';
import { fetchHolidays } from '../../services/Holidays';
import { Data } from './Data';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined } from '@ant-design/icons';
import { GLOBAL_DATA__FETCH_LIMIT } from '../../utils/common';

export const Holidays = () => {
  const { t } = useTranslation();

  const [skip, setSkip] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [data, setData] = useState<any>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [selectedMonth, skip]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetchHolidays({
      skip,
      limit: GLOBAL_DATA__FETCH_LIMIT,
      month: selectedMonth,
    });
    const list = response.data.body[0].data || [];
    setData(list);
    setTotalRecords(response.data.body[0]?.totalCounts);
    setIsLoading(false);
  };

  const onPageChangeHandler = (page: number) => {
    setSkip((page - 1) * GLOBAL_DATA__FETCH_LIMIT);
  };

  const onMonthChangeHandler = (value: any) => {
    setSelectedMonth(value);
  };

  return (
    <Layout className='Layout-Container'>
      <NavBar activeKey='1'></NavBar>
      <Layout>
        <PageHeader
          title={t('holidays.pageTitle')}
          description={''}
          primaryBtnText={t('holidays.addHolidayBtnLabel')}
          primaryButtonIcon={<PlusCircleOutlined />}
        />
        <div className='HolidayContent-Container'>
          <Filters onMonthChangeHandler={onMonthChangeHandler}></Filters>
          <Data
            onPageChangeHandler={onPageChangeHandler}
            data={data}
            totalRecords={totalRecords}
            isLoading={isLoading}></Data>
        </div>
      </Layout>
    </Layout>
  );
};
