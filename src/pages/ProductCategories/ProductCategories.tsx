import { Layout } from 'antd';
import React from 'react';
import NavBar from '../../common/NavBar/NavBar';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import Components from '../../components';
import './ProductCategories.css';
import ParentCategories from './ParentCategories';
import ChildCategories from './ChildCategories';

const ProductCategories: React.FC = () => {
  const TabsList = [
    {
      label: 'Parent Categories',
      key: 'parent',
      children: <ParentCategories />,
    },
    {
      label: 'Child Categories',
      key: 'child',
      children: <ChildCategories />,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='5'></NavBar>
      <Layout>
        <PageHeader
          title={'Product Categories'}
          description={''}
          primaryBtnText={'Upload Categories'}
        />
        <div className='Tabs-Container'>
          <Components.Tabs
            defaultActiveKey='1'
            type='card'
            size={'large'}
            items={TabsList}
          />
        </div>
      </Layout>
    </Layout>
  );
};

export default ProductCategories;
