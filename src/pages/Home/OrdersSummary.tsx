import React from 'react';
import { useMetrics } from '../../hooks/useMetrics';
import Components from '../../components';
import './OrdersSummary.css';

interface OrderCardIProps {
  title: string;
  count: number;
  bgColor?: string;
  loading: boolean;
}

const OrderCard: React.FC<OrderCardIProps> = ({
  title,
  count,
  bgColor,
  loading,
}) => {
  return (
    <Components.Card
      bordered
      className='Orders-Summary-Card'
      bodyStyle={{ width: '100%' }}
      hoverable
      style={{ backgroundColor: bgColor ? bgColor : undefined }}
      loading={loading}>
      <div className='Orders-Summary-CardItem'>
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

export const OrdersSummary = () => {
  const { entityCountsInfo, isLoading } = useMetrics();
  return (
    <div className='Orders-Summary-Container'>
      <OrderCard
        title={"Today's Order"}
        count={entityCountsInfo?.todayOrderCount || 0}
        bgColor={'#f5b208'}
        loading={isLoading}
      />
      <OrderCard
        title={'Orders this week'}
        count={entityCountsInfo?.weekOrderCount || 0}
        loading={isLoading}
      />
      <OrderCard
        title='Orders this month'
        count={entityCountsInfo?.monthOrderCount || 0}
        loading={isLoading}
      />
      <OrderCard
        title='Orders this year'
        count={entityCountsInfo?.totalOrderCount || 0}
        loading={isLoading}
      />
    </div>
  );
};
