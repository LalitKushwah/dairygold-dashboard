import React from 'react';
import NavBar from '../../common/NavBar/NavBar';
import { Layout } from 'antd';
import { PageHeader } from '../../common/PageHeader/PageHeader';
const { Content } = Layout;

export const OrdersPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey={'2'}></NavBar>
      <Layout>
        <PageHeader
          title='Orders'
          primaryBtnText='Export Orders'
        />
      </Layout>
    </Layout>
  );
};
