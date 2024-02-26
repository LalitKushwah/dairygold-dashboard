import React, { ChangeEvent } from 'react';
import './SalesExecutive.css';
import { Users } from '../../common/Users/Users';
import { FileExcelOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PAGE_TYPE } from '../../common/Users/utils';

export const SalesExecutive: React.FC = () => {
  return (
    <Users
      pageTitle='Salesmans'
      primaryBtnText='Add Salesman'
      activeKey='4'
      pageType={PAGE_TYPE.EXECUTIVE}
      primaryBtnIcon={<PlusCircleOutlined />}
      primaryBtnId='addExecutive'></Users>
  );
};
