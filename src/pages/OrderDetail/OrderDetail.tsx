import { Col, Layout, Row, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import NavBar from '../../common/NavBar/NavBar';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import Components from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderDetail } from '../../services/Order';
import { OrderEntity, OrderItem, OrderItemDetail } from '../../models/OrderModel';
import { orderStatusTagColorMapping } from '../Orders/util';
import './OrderDetail.css';
import { formatTimestampToReadableDate } from '../../utils/common';
import { useTranslation } from 'react-i18next';

const RowRenderer = ({
  label,
  value,
  copyable = false,
}: {
  label: string;
  value: string | number;
  copyable?: boolean;
}) => {
  return (
    <Row gutter={16}>
      <Col span={12}>{label}</Col>
      <Col span={12}>
        <Components.Text copyable={copyable}>{value}</Components.Text>
      </Col>
    </Row>
  );
};

export const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderEntity>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    const fetchOrderDetails = async () => {
      try {
        if (id) {
          const response = await fetchOrderDetail(id);
          if (response && response.data && response.data.body) {
            setOrderDetails(response.data.body[0]);
          }
          setIsLoading(false);
        }
      } catch (ex) {
        setIsLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const column = [
    {
      title: 'Name',
      dataIndex: 'productDetail',
      key: 'productDetail',
      render: (productDetail: OrderItemDetail) => {
        return productDetail.name;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quanity',
    },
    {
      title: 'SubTotal',
      dataIndex: 'subTotal',
      key: 'subTotal',
      render: (_subTotal: number, record: OrderItem) =>
        record.quantity * record.price,
    },
    {
      title: 'Net Weight',
      dataIndex: 'netWeight',
      key: 'netWeight',
    },
  ];

  return (
    <Layout className='OrderDetail-Page-Container'>
      <NavBar activeKey='2'></NavBar>
      <Layout>
        <PageHeader
          title={'Order Details'}
          primaryBtnText={t('orders.goToOrdersPageLabel')}
          primaryBtnAction={() => navigate('/orders')}
        />
        {orderDetails ? (
          <div className='OrderDetail-Container'>
            <Components.Card
              className='OrderDetail-Summary-Card'
              loading={isLoading}
              title={
                <Components.Text copyable>
                  {orderDetails?.orderId}
                </Components.Text>
              }
              extra={
                <Tag color={orderStatusTagColorMapping(orderDetails?.status)}>
                  {orderDetails?.status}
                </Tag>
              }>
              <RowRenderer
                label={t('date')}
                value={formatTimestampToReadableDate(
                  orderDetails?.lastUpdatedAt
                )}
              />
              <RowRenderer
                label={t('customer')}
                value={orderDetails?.userDetail?.name}
                copyable={true}
              />
              <RowRenderer
                label={t('salesman')}
                value={orderDetails?.salesmanName}
              />
              <RowRenderer
                label={t('province')}
                value={orderDetails?.province}
              />
              <RowRenderer
                label={t('orders.orderTotalLabel')}
                value={orderDetails?.orderTotal}
              />
              <RowRenderer
                label={t('orders.totalNetWeight')}
                value={orderDetails?.totalNetWeight}
              />
            </Components.Card>
            <Components.Card
              title={t('products')}
              style={{ flex: 2 }}>
              <Components.Table
                loading={isLoading}
                dataSource={orderDetails?.productList || []}
                columns={column}
                pagination={false}
              />
            </Components.Card>
          </div>
        ) : (
          <Spin />
        )}
      </Layout>
    </Layout>
  );
};
