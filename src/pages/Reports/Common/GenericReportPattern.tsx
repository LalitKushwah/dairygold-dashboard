import React, { useEffect, useState } from 'react';
import Components from '../../../components';
import { DownloadOutlined, FileExcelOutlined } from '@ant-design/icons';
import Xslx from '../../../assets/images/Xslx.svg';
import { deepClone, downloadPdf } from '../../../utils/common';
import { getNonCustomerList } from '../../../services/User';
import { DatePicker, notification } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './GenericReportPattern.css';
import * as XLSX from 'xlsx';
import { downloadCheckInReport } from '../../../services/Reports';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

interface IGenericReportPattern {
  apiFn: any;
  reportTitle: string;
  apiPayload: any;
  downloadFileNamePrefix: string;
}

export const GenericReportPattern: React.FC<IGenericReportPattern> = ({
  apiFn,
  reportTitle,
  apiPayload,
  downloadFileNamePrefix,
}) => {
  const [nonCustomersList, setNonCustomersList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedNonCustomer, setSelectedNonCustomer] =
    useState<any>(undefined);
  const [fromDate, setFromDate] = useState(dayjs(dayjs(), dateFormat));
  const [throughDate, setThroughDate] = useState(
    dayjs(dayjs().subtract(15, 'day'), dateFormat)
  );

  const downloadReport = async () => {
    const payload: any = {
      externalId: selectedNonCustomer,
      fromDate: fromDate,
      toDate: throughDate,
    };
    try {
      const response: any = await apiFn(payload);
      const data = response && response.body;
      if (data) {
        XLSX.writeFile(
          data,
          `${payload.externalId}${downloadFileNamePrefix}.xlsx`
        );
      } else {
        notification.warning({
          message: 'No data available, please contact to admin',
        });
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      //TODO: need to check whether it should be hardcoded or not
      const response: any = await getNonCustomerList();
      const list = response.data?.body;
      const modifiledList: any = [{ label: 'All', value: 'All' }];
      list.map((item: any) => {
        const obj = {
          label: item.name,
          value: item.externalId,
        };
        modifiledList.push(obj);
      });
      setSelectedNonCustomer(modifiledList[0].value);
      setNonCustomersList(modifiledList);
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (value: any) => {
    if (value && value.length === 2) {
      const [fromDate, toDate] = value;
      setFromDate(fromDate.format(dateFormat));
      setThroughDate(toDate.format(dateFormat));
    }
  };

  return (
    <div className='Report-Container'>
      <Components.Card
        className='GenericReport'
        title={reportTitle}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          },
        }}>
        <div className='GenericReport-Content-Container'>
          <div className='GenericReport-Left-Container'>
            <RangePicker
              defaultValue={[throughDate, fromDate]}
              format={dateFormat}
              onChange={handleDateChange}
            />
            <Components.Select
              size='large'
              className='Report-CustomerCategory-Select'
              value={selectedNonCustomer}
              loading={isLoading}
              options={nonCustomersList}
              onChange={(value) => setSelectedNonCustomer(value)}
            />
            <div style={{ width: '100%' }}>
              <Components.Button
                type='primary'
                size='large'
                block
                icon={<DownloadOutlined />}
                onClick={downloadReport}>
                Download
              </Components.Button>
            </div>
          </div>
          <div className='GenericReport-Right-Container'>
            <Components.Image
              preview={false}
              height={100}
              src={Xslx}
              width={100}></Components.Image>
          </div>
        </div>
      </Components.Card>
    </div>
  );
};
