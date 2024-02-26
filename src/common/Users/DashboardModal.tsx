import React, { useEffect, useState } from 'react';
import Components from '../../components';
import './Users.css';
import { fetchParentCategories } from '../../services/Category';
import {
  Category,
  getEmptyCategoryStructure,
} from '../../models/CategoryModel';
import { getUserDashboard } from '../../services/User';
import { TgtAchFields, UserDashboardFields } from '../../models/UserLoginModel';
import { calculateTgtAchData } from '../../pages/Home/util';
import { message } from 'antd';
import { PAGE_TYPE } from './utils';
import { useTranslation } from 'react-i18next';

interface DashboardDataProps {
  isOpen: boolean;
  title: string;
  handleCancel: () => void;
  pageType: string;
  externalId: string;
}

export const DashboardDataModal: React.FC<DashboardDataProps> = (props) => {
  const [parentCategoryList, setParentCategoryList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDashboardData, setUserDashboardData] =
    useState<UserDashboardFields>();
  const [data, setData] = useState<TgtAchFields>({
    target: 0,
    achieve: 0,
    achievedPercentage: 0,
    balanceToDo: 0,
    creditLimit: 0,
    currentOutStanding: 0,
    thirtyDaysOutStanding: 0,
    availableCreditLimit: 0,
    lmtd: 0,
    lymtd: 0,
    lmtdGrowthPercentage: 0,
    lymtdGrowthPercentage: 0,
    ftd: 0,
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (props.isOpen) {
      fetchParentCategoryList();
      getTgtVsAchieveData();
    }
  }, [props.isOpen]);

  const fetchParentCategoryList = () => {
    fetchParentCategories({ skip: 0, limit: 20 }).then(
      (response: { data: { body: Category[] } }) => {
        const categories = response.data?.body || [];
        const struct = getEmptyCategoryStructure() || {};
        categories.unshift({
          ...struct,
          label: 'All Categories',
          value: 'total',
          name: 'total',
        });
        categories.map((category: Category) => {
          if (category.name !== 'total') {
            category['label'] = category.name;
            category['value'] = category.name;
          }
          return category;
        });
        setParentCategoryList(categories);
      }
    );
  };

  const getTgtVsAchieveData = () => {
    setIsLoading(true);
    if (props.externalId) {
      getUserDashboard(props.externalId)
        .then((response: { data: { body: UserDashboardFields[] } }) => {
          const data = response?.data?.body[0];
          if (data) {
            setUserDashboardData({ ...data });
            prepareData('Total', data);
            setIsLoading(false);
          }
        })
        .catch((ex) => {
          message.error(ex);
          setIsLoading(false);
        });
    }
  };

  const prepareData = (selectedValue: string, data: any) => {
    const preparedData = calculateTgtAchData(selectedValue, data);
    setData({ ...preparedData });
  };

  return (
    <div className='Dashboard-Modal-Container'>
      <Components.Modal
      className='Dashboard-Modal-Container-Modal'
        title={props.title}
        open={props.isOpen}
        footer={null}
        onCancel={props.handleCancel}>
        <Components.Card
          loading={isLoading}
          bordered={false}
          className='Dashboard-Modal-Wrapper-Card'>
          <Components.Row justify='end'>
            <Components.Col>
              <Components.Select
                showSearch={true}
                defaultValue={'total'}
                className='Dashboard-Modal-Wrapper-Card-Select'
                onChange={(value) => prepareData(value, userDashboardData)}
                options={parentCategoryList}
                filterOption={(input, option: any) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                data-testid="dashboard-modal-category-list"
                ></Components.Select>
            </Components.Col>
          </Components.Row>

          <Components.Row
            gutter={10}
            className='Dashboard-Modal-Row'
            justify='center'>
            <Components.Col
              xl={props.pageType === PAGE_TYPE.EXECUTIVE ? 12 : 24}
              md={props.pageType === PAGE_TYPE.EXECUTIVE ? 12 : 24}
              sm={8}
              xs={8}
              xxl={8}>
              <Components.Card
                hoverable
                className='Dashboard-Modal-Row-Card'>
                <Components.Title level={4}>{data.ftd || 0}</Components.Title>
                <Components.Text>{t('users.ftd')}</Components.Text>
              </Components.Card>
            </Components.Col>
            {props.pageType === PAGE_TYPE.EXECUTIVE && (
              <Components.Col
                xl={12}
                md={12}
                sm={8}
                xs={8}
                xxl={8}>
                <Components.Card
                  hoverable
                  className='Dashboard-Modal-Row-Card'>
                  <Components.Title level={4}>
                    {data.landing || 0}
                  </Components.Title>
                  <Components.Text>{t('users.landing')}</Components.Text>
                </Components.Card>
              </Components.Col>
            )}
          </Components.Row>

          <Components.Row
            gutter={10}
            className='Dashboard-Modal-Row'
            justify='center'>
            <Components.Col
              xl={12}
              md={12}
              sm={8}
              xs={8}
              xxl={8}>
              <Components.Card
                hoverable
                className='Dashboard-Modal-Row-Card'>
                <Components.Title level={4}>
                  {data.target || 0}
                </Components.Title>
                <Components.Text>{t('users.target')}</Components.Text>
              </Components.Card>
            </Components.Col>
            <Components.Col
              xl={12}
              md={12}
              sm={8}
              xs={8}
              xxl={8}>
              <Components.Card
                hoverable
                className='Dashboard-Modal-Row-Card'>
                <Components.Title level={4}>
                  {data.balanceToDo || 0}
                </Components.Title>
                <Components.Text>{t('users.balanceToDo')}</Components.Text>
              </Components.Card>
            </Components.Col>
          </Components.Row>
          <Components.Row
            gutter={10}
            className='Dashboard-Modal-Row'
            justify='center'>
            <Components.Col
              xl={12}
              md={12}
              sm={8}
              xs={8}
              xxl={8}>
              <Components.Card
                hoverable
                className='Dashboard-Modal-Row-Card'>
                <Components.Title level={4}>
                  {data.achieve || 0}
                </Components.Title>
                <Components.Text>{t('users.mtdAchieved')}</Components.Text>
              </Components.Card>
            </Components.Col>
            <Components.Col
              xl={12}
              md={12}
              sm={8}
              xs={8}
              xxl={8}>
              <Components.Card
                hoverable
                className='Dashboard-Modal-Row-Card'>
                <Components.Title level={4}>
                  {data.achievedPercentage}
                </Components.Title>
                <Components.Text>{t("users.achievedPercentage")}</Components.Text>
              </Components.Card>
            </Components.Col>
          </Components.Row>

          {props.pageType === PAGE_TYPE.EXECUTIVE && (
            <Components.Row
              gutter={10}
              className='Dashboard-Modal-Row'
              justify='center'>
              <Components.Col
                xl={12}
                md={12}
                sm={8}
                xs={8}
                xxl={8}>
                <Components.Card
                  hoverable
                  className='Dashboard-Modal-Row-Card'>
                  <Components.Title level={4}>
                    {data.lmtd || 0}
                  </Components.Title>
                  <Components.Text>{t('users.lmtdAchieved')}</Components.Text>
                </Components.Card>
              </Components.Col>
              <Components.Col
                xl={12}
                md={12}
                sm={8}
                xs={8}
                xxl={8}>
                <Components.Card
                  hoverable
                  className='Dashboard-Modal-Row-Card'>
                  <Components.Title level={4}>
                    {data.lmtdGrowthPercentage || 0}
                  </Components.Title>
                  <Components.Text>{t('user.lmtdPercentage')}</Components.Text>
                </Components.Card>
              </Components.Col>
            </Components.Row>
          )}

          {props.pageType === PAGE_TYPE.EXECUTIVE && (
            <Components.Row
              gutter={10}
              className='Dashboard-Modal-Row'
              justify='center'>
              <Components.Col
                xl={12}
                md={12}
                sm={8}
                xs={8}
                xxl={8}>
                <Components.Card
                  hoverable
                  className='Dashboard-Modal-Row-Card'>
                  <Components.Title level={4}>
                    {data.lmtd || 0}
                  </Components.Title>
                  <Components.Text>{t("users.lymtdAchieved")}</Components.Text>
                </Components.Card>
              </Components.Col>
              <Components.Col
                xl={12}
                md={12}
                sm={8}
                xs={8}
                xxl={8}>
                <Components.Card
                  hoverable
                  className='Dashboard-Modal-Row-Card'>
                  <Components.Title level={4}>
                    {data.lymtdGrowthPercentage | 0}
                  </Components.Title>
                  <Components.Text>{t('users.lymtdPercentage')}</Components.Text>
                </Components.Card>
              </Components.Col>
            </Components.Row>
          )}
        </Components.Card>
      </Components.Modal>
    </div>
  );
};
