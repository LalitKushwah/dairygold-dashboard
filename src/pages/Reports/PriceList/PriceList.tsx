import { Layout } from 'antd';
import React from 'react';
import NavBar from '../../../common/NavBar/NavBar';
import { PageHeader } from '../../../common/PageHeader/PageHeader';
import { DownloadReport } from './Report';

export const PriceList = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='13'></NavBar>
      <Layout>
        <PageHeader title={'Price List'} />
        <div>
          <DownloadReport />
        </div>
      </Layout>
    </Layout>
  );
};
