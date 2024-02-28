import React, { useState } from 'react';
import './Customers.css';
import { Users } from '../../common/Users/Users';
import { FileExcelOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const Customers: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Users
      pageTitle={t('customer')}
      primaryBtnText={t('users.addCustomers')}
      secondaryBtnText={t('users.exportCustomers')}
      activeKey='3'
      pageType='CUSTOMER'
      primaryBtnIcon={<PlusCircleOutlined />}
      secondaryBtnIcon={<FileExcelOutlined />}
      primaryBtnId='addCustomer'></Users>
  );
};
