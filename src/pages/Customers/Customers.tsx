import React, { useState } from 'react';
import './Customers.css';
import { Users } from '../../common/Users/Users';
import { FileExcelOutlined, PlusCircleOutlined } from '@ant-design/icons';

export const Customers: React.FC = () => {
  return (
    <Users
      pageTitle='Customers'
      primaryBtnText='Add Customer'
      secondaryBtnText='Export Customers'
      activeKey='3'
      pageType='CUSTOMER'
      primaryBtnIcon={<PlusCircleOutlined />}
      secondaryBtnIcon={<FileExcelOutlined />}
      primaryBtnId='addCustomer'></Users>
  );
};
