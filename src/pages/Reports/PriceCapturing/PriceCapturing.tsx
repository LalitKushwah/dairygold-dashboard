import React from 'react';
import { Layout } from 'antd';
import NavBar from '../../../common/NavBar/NavBar';
import { PageHeader } from '../../../common/PageHeader/PageHeader';
import { DownloadReport } from './DownloadReport';

export const PriceCapturing = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='14'></NavBar>
      <Layout>
        <PageHeader title={'Price Capturing'} />
        <div>
          <DownloadReport />
        </div>
      </Layout>
    </Layout>
  );
};
