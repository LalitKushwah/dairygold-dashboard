import React from 'react';
import NavBar from '../../common/NavBar/NavBar';
import { Layout } from 'antd';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { PieChart } from '../../common/graphs/PieChart';
import Components from '../../components';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const data = [
    {
      id: 'java',
      label: 'java',
      value: 356,
      color: 'hsl(299, 70%, 50%)',
    },
    {
      id: 'lisp',
      label: 'lisp',
      value: 481,
      color: 'hsl(165, 70%, 50%)',
    },
    {
      id: 'elixir',
      label: 'elixir',
      value: 321,
      color: 'hsl(198, 70%, 50%)',
    },
    {
      id: 'scala',
      label: 'scala',
      value: 573,
      color: 'hsl(304, 70%, 50%)',
    },
    {
      id: 'rust',
      label: 'rust',
      value: 186,
      color: 'hsl(229, 70%, 50%)',
    },
  ];
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
        <Components.Card
          style={{ height: 400, width: 400, margin: 20 }}
          bordered>
          <div style={{ height: 400, width: 400 }}>
            <PieChart data={data}></PieChart>
          </div>
        </Components.Card>
      </Layout>
    </Layout>
  );
};
