import React from 'react';
import NavBar from '../../common/NavBar/NavBar';
import { Layout } from 'antd';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useMetrics } from '../../hooks/useMetrics';
import { OrdersSummary } from './OrdersSummary';
import { Stats } from './Stats';
import { TgtVsAct } from './TgtVsAct';
import { useNavigate } from 'react-router-dom';
import { logoutButtonId } from './util';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entityCountsInfo, isLoading } = useMetrics();

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='1'></NavBar>
      <Layout>
        <PageHeader
          title={t('welcomeMsg')}
          description={t('welcomeMsgDescription')}
          primaryBtnText={t('logoutBtnLabel')}
          primaryButtonIcon={<LogoutOutlined />}
          primaryBtnAction={logoutHandler}
          primaryBtnId={logoutButtonId}
        />
        {entityCountsInfo ? (
          <>
            <OrdersSummary
              entityCountsInfo={entityCountsInfo || {}}
              isLoading={isLoading}
            />
          </>
        ) : undefined}
        <TgtVsAct />
        {entityCountsInfo ? (
          <Stats
            entityCountsInfo={entityCountsInfo}
            isLoading={isLoading}
          />
        ) : undefined}
      </Layout>
    </Layout>
  );
};
