import React, { useEffect } from 'react';
import NavBar from '../../common/NavBar/NavBar';
import { Layout } from 'antd';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { PieChart } from '../../common/graphs/PieChart';
import { useMetrics } from '../../hooks/useMetrics';
import { OrdersSummary } from './OrdersSummary';
import { Stats } from './Stats';
import { TgtVsAct } from './TgtVsAct';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='1'></NavBar>
      <Layout>
        <PageHeader
          title={t('welcomeMsg')}
          description={t('welcomeMsgDescription')}
          primaryBtnText={t('logoutBtnLabel')}
          primaryButtonIcon={<LogoutOutlined />}
        />
        <OrdersSummary />
        <TgtVsAct />
        <Stats />
      </Layout>
    </Layout>
  );
};
