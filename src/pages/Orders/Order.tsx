import React, { useState } from 'react';
import NavBar from '../../common/NavBar/NavBar';
import { Layout } from 'antd';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { OrderData } from './Data';
import { OrderFilters } from './Filters';

export const OrdersPage: React.FC = () => {
  const [selectedSMFilter, setSelectedSMFilter] = useState<string>('');
  const [selectedOrderStatusFilter, setSelectedOrderStatusFilter] =
    useState<string>('');
  const [searchBy, setSearchBy] = useState<string>('');

  const onSMFilterChangeHandler = (value: string) => {
    setSelectedSMFilter(value);
  };

  const onOrderStatusChangeHandler = (value: string) => {
    setSelectedOrderStatusFilter(value);
  };

  const onSearchByChangeHandler = (e: {target: {value: string}}) => {
    setSearchBy(e.target.value);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey={'2'}></NavBar>
      <Layout>
        <PageHeader
          title='Orders'
          primaryBtnText='Export Orders'
        />
        <OrderFilters
          onOrderStatusChangeHandler={onOrderStatusChangeHandler}
          onSearchByChangeHandler={onSearchByChangeHandler}
          onSMFilterChangeHandler={onSMFilterChangeHandler}
          searchByValue={searchBy}
        />
        <OrderData
          searchBy={searchBy}
          salesman={selectedSMFilter}
          orderStatus={selectedOrderStatusFilter}
        />
      </Layout>
    </Layout>
  );
};
