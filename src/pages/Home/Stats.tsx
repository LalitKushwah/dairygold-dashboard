import React from 'react';
import Components from '../../components';
import './Stats.css';
import { DasboardEntityCountsResponseBody } from '../../models/DasboardEntityCountsReponseModel';

interface StatsCardIProps {
  title: string;
  count: number;
  bgColor?: string;
  loading: boolean;
}

const StatsCard: React.FC<StatsCardIProps> = ({
  title,
  count,
  bgColor,
  loading,
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
          <Components.Title level={1}>
            {count.toLocaleString()}
          </Components.Title>
          <Components.Text>{title}</Components.Text>
        </div>
      </div>
    </Components.Card>
  );
};

interface StatsIProps {
  entityCountsInfo: DasboardEntityCountsResponseBody;
  isLoading: boolean;
}

export const Stats: React.FC<StatsIProps> = ({
  entityCountsInfo,
  isLoading,
}) => {
  return (
    <div className='Stats-Container'>
      <StatsCard
        title={'Customers'}
        count={entityCountsInfo?.customerCount || 0}
        loading={isLoading}
      />
      <StatsCard
        title={'Salesmans'}
        count={entityCountsInfo?.salesmanCount || 0}
        loading={isLoading}
      />
      <StatsCard
        title='Sales-Managers'
        count={entityCountsInfo?.salesmanagerCount || 0}
        loading={isLoading}
      />
      <StatsCard
        title='Categories'
        count={entityCountsInfo?.parentCategoryCount || 0}
        loading={isLoading}
      />
      <StatsCard
        title='Products'
        count={entityCountsInfo?.productCount || 0}
        loading={isLoading}
      />
    </div>
  );
};
