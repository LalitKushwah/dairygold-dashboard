import React from 'react';
import NavBar from '../../common/NavBar';
import { Layout } from 'antd';

const { Content } = Layout;

export const HomePage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='1'></NavBar>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            Home Page
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
