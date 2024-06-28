import React from 'react';
import { Layout } from 'antd';
import NavBar from '../../../common/NavBar/NavBar';
import { PageHeader } from '../../../common/PageHeader/PageHeader';
import { GenericReportPattern } from '../Common/GenericReportPattern';
import { downloadCheckInReport } from '../../../services/Reports';

export const CheckInReport = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='16'></NavBar>
      <Layout>
        <PageHeader title={'Check In Report'} />
        <div>
          <GenericReportPattern
            apiFn={downloadCheckInReport}
            reportTitle='Download Check In Report'
            apiPayload={{ userType: ['SALESMAN', 'SALESMANAGER'] }}
            downloadFileNamePrefix='Check_In_Report'
          />
        </div>
      </Layout>
    </Layout>
  );
};
