import React from 'react';
import { Layout } from 'antd';
import NavBar from '../../../common/NavBar/NavBar';
import { PageHeader } from '../../../common/PageHeader/PageHeader';
import { GenericReportPattern } from '../Common/GenericReportPattern';
import { downloadActivityReport } from '../../../services/Reports';

export const ActivityReport = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar activeKey='25'></NavBar>
      <Layout>
        <PageHeader title={'Activity Report'} />
        <div>
          <GenericReportPattern
            apiFn={downloadActivityReport}
            reportTitle='Download Activity Report'
            apiPayload={{ userType: ['SALESMAN', 'SALESMANAGER'] }}
            isSMRequired={false}
            downloadFileNamePrefix='Activity_Report'
            fromDateName={'startDate'}
            throughDateName={'endDate'}
            diffBetweenFromAndToDate={10}
          />
        </div>
      </Layout>
    </Layout>
  );
};
