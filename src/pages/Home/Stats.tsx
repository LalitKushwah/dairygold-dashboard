import React, { ReactNode } from 'react';
import { useMetrics } from '../../hooks/useMetrics';
import Components from '../../components';
import './Stats.css';
import {
  ApartmentOutlined,
  MobileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

interface StatsCardIProps {
  title: string;
  count: number;
  bgColor?: string;
  loading: boolean;
  IconComponent: any;
}

const StatsCard: React.FC<StatsCardIProps> = ({
  title,
  count,
  bgColor,
  loading,
  IconComponent,
}) => {
  return (
    <Components.Card
      bordered
      className='Stats-Card'
      bodyStyle={{ width: '100%' }}
      hoverable
      style={{ backgroundColor: bgColor ? bgColor : undefined }}
      loading={loading}>
      <div className='Stats-CardItem'>
        <div>
          {/* {IconComponent} */}
          <Components.Title level={1}>
            {count.toLocaleString()}
          </Components.Title>
          <Components.Text>{title}</Components.Text>
        </div>
      </div>
    </Components.Card>
  );
};

export const Stats = () => {
  const { entityCountsInfo, isLoading } = useMetrics();
  return (
    <div className='Stats-Container'>
      <StatsCard
        title={'Customers'}
        count={entityCountsInfo?.customerCount || 0}
        loading={isLoading}
        IconComponent={<UserOutlined />}
      />
      <StatsCard
        title={'Salesmans'}
        count={entityCountsInfo?.salesmanCount || 0}
        loading={isLoading}
        IconComponent={<UserOutlined />}
      />
      <StatsCard
        title='Sales-Managers'
        count={entityCountsInfo?.salesmanagerCount || 0}
        loading={isLoading}
        IconComponent={<TeamOutlined />}
      />
      <StatsCard
        title='Categories'
        count={entityCountsInfo?.parentCategoryCount || 0}
        loading={isLoading}
        IconComponent={<ApartmentOutlined />}
      />
      <StatsCard
        title='Products'
        count={entityCountsInfo?.productCount || 0}
        loading={isLoading}
        IconComponent={<MobileOutlined />}
      />
    </div>
  );
};
