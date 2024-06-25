import React, { useEffect, useState } from 'react';
import Components from '../../../components';
import './Report.css';
import { fetchCategoryByExecutive } from '../../../services/Category';
import { DownloadOutlined } from '@ant-design/icons';
import DownloadReportImg from '../../../assets/images/DownloadReport.svg';
import { downloadPriceListReport } from '../../../services/Reports';
import { downloadPdf } from '../../../utils/common';

// const SELECT_CATEGORY_PLACEHOLDER;

export const DownloadReport = () => {
  const [categoriesData, setCategoriesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      //TODO: need to check whether it should be hardcoded or not
      const response: any = await fetchCategoryByExecutive({
        executiveCode: 'admin',
      });
      const list = response.data?.body[0]?.category || [];
      const modifiledList = list.map((item: any) => ({
        label: item,
        value: item,
      }));
      setCategoriesData(modifiledList);
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  };

  const dowloadReport = async () => {
    try {
      const response = await downloadPriceListReport({
        categoryName: selectedCategory,
      });
      downloadPdf(response.data, `${selectedCategory}_PriceList`);
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div className='Report-Container'>
      <Components.Card
        className='Report-Card'
        title={'Download Price List Report'}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <Components.Select
          size='large'
          className='Report-CustomerCategory-Select'
          value={selectedCategory}
          loading={isLoading}
          options={categoriesData}
          placeholder='Select Category'
          onChange={(value) => setSelectedCategory(value)}
        />
        <Components.Image
          preview={false}
          height={100}
          src={DownloadReportImg}
          width={100}></Components.Image>
        <div style={{ width: '100%' }}>
          <Components.Button
            type='primary'
            size='large'
            block
            disabled={!selectedCategory}
            icon={<DownloadOutlined />}
            onClick={dowloadReport}>
            Download
          </Components.Button>
        </div>
      </Components.Card>
    </div>
  );
};
