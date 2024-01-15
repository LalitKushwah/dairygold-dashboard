import React from 'react';
import NavBar from '../../common/NavBar';
import { Layout } from 'antd';
const { Content } = Layout;

export const OrdersPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey={'2'}></NavBar>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            Order Page
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
