import React from 'react';
import { Layout } from 'antd';
import NavBar from '../../../common/NavBar/NavBar';
import { PageHeader } from '../../../common/PageHeader/PageHeader';
import { GenericReportPattern } from '../Common/GenericReportPattern';
import { getNonCustomerList } from '../../../services/User';
import { downloadStockingReport } from '../../../services/Reports';

export const StockingReport = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='15'></NavBar>
      <Layout>
        <PageHeader title={'Stocking Report'} />
        <div>
          <GenericReportPattern
            apiFn={downloadStockingReport}
            reportTitle='Download Stocking Report'
            apiPayload={{ userType: ['SALESMAN', 'SALESMANAGER'] }}
            downloadFileNamePrefix='Stocking_Report'
          />
        </div>
      </Layout>
    </Layout>
  );
};
