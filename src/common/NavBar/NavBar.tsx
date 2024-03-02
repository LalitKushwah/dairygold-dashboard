import React, { useState } from 'react';
import {
  CustomerServiceOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  FieldTimeOutlined,
  GroupOutlined,
  InfoCircleOutlined,
  MoneyCollectOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Logo from '../../assets/images/dairy_gold_logo.png';
import Components from '../../components';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menuItemKeyRouteMapping: any = {
  '1': '/home',
  '2': '/orders',
  '3': '/customers',
  '4': '/sales_executive',
  '5': '/product_categories',
  '8': '/schedulers',
};

const items: MenuItem[] = [
  getItem('Dashboard', '1', <DashboardOutlined />),
  getItem('Orders', '2', <ShoppingOutlined />),
  getItem('Customers', '3', <UserOutlined />),
  getItem('Sales Executives', '4', <CustomerServiceOutlined />),
  getItem('Product Categories', '5', <GroupOutlined />),
  getItem('Products', '6', <DesktopOutlined />),
  getItem('DG Products', '7', <PieChartOutlined />),
  getItem('Schedulers', '8', <FieldTimeOutlined />),
  getItem('Feeds', '9', <InfoCircleOutlined />),
  getItem('Milk Collection', '10', <MoneyCollectOutlined />),
  getItem('Holidays', '11', <PieChartOutlined />),
  getItem('Reports', '12', <DatabaseOutlined />, [
    getItem('Price List', '13'),
    getItem('Price Capturing', '14'),
    getItem('Stock Capturing', '15'),
    getItem('Check In Report', '16'),
    getItem('Van Performance', '17'),
    getItem('SKU Performance', '18'),
    getItem('Customer Performance', '19'),
    getItem('SM Attendance', '20'),
    getItem('Focused Pack', '21'),
    getItem('Payment Report', '22'),
    getItem('Tgt vs Ach', '23'),
    getItem('Invoice against Order', '24'),
    getItem('Activity Report', '25'),
  ]),
];

interface NavBarIProps {
  activeKey: string;
  children?: any;
}

const NavBar: React.FC<NavBarIProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}>
      <div
        className='demo-logo-vertical'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
          marginTop: 40,
        }}>
        <Components.Image
          src={Logo}
          height={100}
          width={100}
          preview={false}
          style={{ borderRadius: '50%' }}
        />
      </div>
      <Components.Divider style={{ borderColor: 'gray' }} />
      <Menu
        theme='dark'
        defaultSelectedKeys={[props.activeKey]}
        mode='inline'
        items={items}
        style={{ minWidth: 250, fontSize: 16 }}
        onClick={({ key }) => {
          const route = menuItemKeyRouteMapping[key];
          return navigate(route);
        }}
      />
    </Sider>
  );
};

export default NavBar;
