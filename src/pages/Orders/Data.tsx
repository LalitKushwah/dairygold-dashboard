import React, { useEffect, useState } from 'react';
import Components from '../../components';
import { fetchOrders } from '../../services/Order';
import { Tag, Typography } from 'antd';
import { orderStatusTagColorMapping } from './util';
import { OrderEntity } from '../../models/OrderModel';
import './Orders.css';
import { useNavigate } from 'react-router-dom';
import { formatTimestampToReadableDate } from '../../utils/common';

interface OrderDataIProps {
  searchBy: string;
  salesman: string;
  orderStatus: string;
}

export const OrderData: React.FC<OrderDataIProps> = ({
  searchBy,
  salesman,
  orderStatus,
}) => {
  const { Text } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (orderId: string) => <Text copyable>{orderId}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: 'userDetail',
      key: 'customer',
      render: (_key: string, record: OrderEntity) => (
        <Text copyable>{record.userDetail.name}</Text>
      ),
    },
    {
      title: 'Salesman',
      dataIndex: 'salesmanName',
      key: 'salesman',
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'Amount',
      dataIndex: 'orderTotal',
      key: 'amount',
      render: (amount: number) => <Text>{amount.toLocaleString()}</Text>,
    },
    {
      title: 'Quantity (Cases)',
      dataIndex: 'totalQuantity',
      key: 'quanity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status) {
          return (
            <Tag
              bordered
              color={orderStatusTagColorMapping(status)}>
              <Components.Text strong>{status}</Components.Text>
            </Tag>
          );
        }
      },
    },
    {
      title: 'Date',
      dataIndex: 'lastUpdatedAt',
      key: 'date',
      render: (lastUpdatedAt: number) => (
        <Text>{formatTimestampToReadableDate(lastUpdatedAt)}</Text>
      ),
    },
  ];

  const [ordersList, setOrdersList] = useState<OrderEntity[]>([]);
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getOrders({ searchBy, salesman, status: orderStatus });
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [skip, searchBy, salesman, orderStatus]);

  const getOrders = async ({
    searchBy,
    salesman,
    status,
  }: {
    searchBy: string;
    salesman: string;
    status: string;
  }) => {
    setIsLoading(true);
    const query = {
      salesmanCode: salesman && salesman !== 'All' ? salesman : undefined,
      status: status && status !== 'All' ? status : undefined,
      searchKeyword: searchBy ? searchBy : undefined,
    };
    const sanitizedQuery = JSON.parse(JSON.stringify(query));
    try {
      const response = await fetchOrders({
        skip: skip,
        limit: 10,
        ...sanitizedQuery,
      });
      setIsLoading(false);
      if (response?.data && response.data?.body) {
        const orders = response.data?.body[0].data;
        setTotalRecords(response.data?.body[0].totalCounts || 0);
        orders.map((item: OrderEntity, index: number) => ({
          ...item,
          key: index,
        }));
        setOrdersList(orders);
      }
    } catch (ex) {
      setIsLoading(false);
    }
  };
  const onPageChangeHandler = (page: number, pageSize: number) => {
    if (page === 1) {
      setSkip(0);
    } else {
      setSkip((page - 1) * 10);
    }
  };
  return (
    <div className='Orders-Data-Container'>
      <Components.Table
        columns={columns}
        dataSource={ordersList} // Add keys to each row
        loading={isLoading}
        pagination={false}
        onRow={(record: OrderEntity) => ({
          onClick: () => navigate(`/order/${record._id}`),
        })}
        rowClassName='Order-Data-Row'
        paginationProps={{
          defaultCurrent: 1,
          total: totalRecords,
          onChange: onPageChangeHandler,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};
