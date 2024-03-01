import React, { ChangeEvent } from 'react';
import './SalesExecutive.css';
import { Users } from '../../common/Users/Users';
import { FileExcelOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PAGE_TYPE } from '../../common/Users/utils';
import { useTranslation } from 'react-i18next';

export const SalesExecutive: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Users
      pageTitle={t('salesman')}
      primaryBtnText={t('users.addSalesman')}
      activeKey='4'
      pageType={PAGE_TYPE.EXECUTIVE}
      primaryBtnIcon={<PlusCircleOutlined />}
      primaryBtnId='addExecutive'></Users>
  );
};
