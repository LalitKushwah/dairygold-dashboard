import React, { useEffect, useState } from 'react';
import Components from '../../../components';
import { DownloadOutlined } from '@ant-design/icons';
import DownloadReportImg from '../../../assets/images/DownloadReport.svg';
import { deepClone, downloadPdf } from '../../../utils/common';
import { getNonCustomerList } from '../../../services/User';
import { DatePicker, notification } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { fetchPriceCapturingReport } from '../../../services/Order';
import './PriceCapturing.css';

dayjs.extend(customParseFormat);

export const DownloadReport = () => {
  const dateFormat = 'DD/MM/YYYY';

  const [nonCustomersList, setNonCustomersList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedNonCustomer, setSelectedNonCustomer] =
    useState<any>(undefined);
  const [selectedReportType, setSelectedReportType] = useState<String>('All');
  const [fromDate, setFromDate] = useState(dayjs(dayjs(), dateFormat));
  const [throughDate, setThroughDate] = useState(
    dayjs(dayjs().subtract(15, 'day'), dateFormat)
  );

  const reportsList = [
    { label: 'All', value: 'All' },
    { label: 'Price Capturing', value: 'price_capturing' },
    { label: 'Stocking', value: 'stocking' },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      //TODO: need to check whether it should be hardcoded or not
      const response: any = await getNonCustomerList();
      const list = response.data?.body || [];
      const modifiledList: any = [{ label: 'All', value: 'All' }];
      list.map((item: any) => {
        const obj = {
          label: item.name,
          value: item.externalId,
        };
        modifiledList.push(obj);
      });
      setSelectedNonCustomer(modifiledList[0].value);
      console.log(modifiledList);
      setNonCustomersList(modifiledList);
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = async () => {
    const query = {
      externalId: selectedNonCustomer,
      reportType: selectedReportType === 'All' ? undefined : selectedReportType,
      fromDate,
      throughDate,
    };
    try {
      const response: any = await fetchPriceCapturingReport(deepClone(query));
      if (response && response.body && response.body.length) {
        downloadPdf(
          response.data,
          `${selectedNonCustomer}_${selectedReportType}_PriceCapturing`
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
        className='PriceCapturing-Report-Card'
        title={'Download Price Capturing Report'}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          },
        }}>
        <div className='PriceCapturing-Content-Container'>
          <div className='PriceCapturing-Left-Container'>
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
            <Components.Select
              size='large'
              className='Report-CustomerCategory-Select'
              value={selectedReportType}
              options={reportsList}
              placeholder='Select Report'
              onChange={(value) => setSelectedReportType(value)}
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
          <div className='PriceCapturing-Right-Container'>
            <Components.Image
              preview={false}
              height={100}
              src={DownloadReportImg}
              width={100}></Components.Image>
          </div>
        </div>
      </Components.Card>
    </div>
  );
};
