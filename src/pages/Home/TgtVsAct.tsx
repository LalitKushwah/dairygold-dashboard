import React, { useEffect, useState } from 'react';
import Components from '../../components';
import { Card, Col, Row, Select, message } from 'antd';
import {
  TgtAchFields,
  UserDashboardFields,
  UserData,
  UserType,
  getEmptyUserStructure,
} from '../../models/UserLoginModel';
import {
  getAssociatedSalesmansList,
  getSalesmansList,
  getUserDashboard,
} from '../../services/User';
import { fetchParentCategories } from '../../services/Category';
import { calculateTgtAchData } from './util';
import { useTranslation } from 'react-i18next';
import {
  Category,
  getEmptyCategoryStructure,
} from '../../models/CategoryModel';

export const TgtVsAct = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<UserData>();
  const [cateogoryList, setCategoryList] = useState<Category[]>([]);
  const [salesmanList, setSalesmanList] = useState<UserData[]>([]);
  const [selectedSMExternalId, setSelectedSMExternalId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    fetchLoggedInUserDetails();
  }, []);

  useEffect(() => {
    const isUserDetailExists =
      loggedInUser && Object.keys(loggedInUser || {}).length;
    if (isUserDetailExists) {
      fetchSalesmanDataList();
      fetchParentCategoryList();
      getTgtVsAchieveData();
    }
  }, [loggedInUser]);

  useEffect(() => {
    getTgtVsAchieveData();
  }, [selectedSMExternalId]);

  const fetchLoggedInUserDetails = () => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const parsedValue: UserData = JSON.parse(user);
      setSelectedSMExternalId(parsedValue.externalId);
      setLoggedInUser(parsedValue);
    }
  };

  const fetchSalesmanDataList = () => {
    const { userType, externalId } = loggedInUser || {};
    if (userType === UserType.ADMIN_HO) {
      getSalesmansList().then((response: { data: { body: UserData[] } }) => {
        const salesmanDataList = response.data.body || [];
        const userStruct = getEmptyUserStructure();
        salesmanDataList.unshift({
          ...userStruct,
          label: loggedInUser?.name || '',
          value: externalId || '',
          name: loggedInUser?.name || '',
          externalId: externalId || '',
        });
        salesmanDataList.map((salesman: UserData) => {
          salesman['label'] = `${salesman.externalId} - ${salesman.name}`;
          salesman['value'] = salesman.externalId;
          return salesman;
        });
        setSalesmanList(salesmanDataList);
      });
    } else {
      if (externalId) {
        getAssociatedSalesmansList({ externalId }).then(
          (response: {
            data: {
              body: UserData[];
            };
          }) => setSalesmanList(response.data?.body || [])
        );
      }
    }
  };

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
        setCategoryList(categories);
      }
    );
  };

  const getTgtVsAchieveData = () => {
    setIsLoading(true);
    if (selectedSMExternalId) {
      getUserDashboard(selectedSMExternalId)
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
    <div style={{ margin: 10 }}>
      <Components.Card
        hoverable
        title={t('dashboard.tgtActCardTitle')}
        style={{
          height: 350,
        }}
        loading={isLoading}
        extra={
          <div style={{ margin: 10 }}>
            {selectedSMExternalId ? (
              <Select
                defaultValue={selectedSMExternalId}
                style={{ width: 200, marginRight: 20 }}
                onChange={(externalId) => setSelectedSMExternalId(externalId)}
                options={salesmanList}
              />
            ) : undefined}
            <Select
              defaultValue={'total'}
              style={{ width: 200 }}
              onChange={(value) => prepareData(value, userDashboardData)}
              options={cateogoryList}
            />
          </div>
        }>
        <Row gutter={16}>
          <Col span={5}>
            <Card
              title={t('dashboard.landing')}
              bordered={false}>
              {data.landing || 0}
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title={t('dashboard.ftdAch')}
              bordered={false}>
              {data.ftd || 0}
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title={t('dashboard.mtdAch')}
              bordered={false}>
              {data.achieve || 0}
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title={t('dashboard.percantageAch')}
              bordered={false}>
              {data.achievedPercentage || 0}
            </Card>
          </Col>
          <Col span={4}>
            <Card
              title={t('dashboard.lmtdAch')}
              bordered={false}>
              {data.lmtd || 0}
            </Card>
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{ marginTop: 15 }}>
          <Col span={5}>
            <Card
              title={t('dashboard.percanageGrowthOverLmtd')}
              bordered={false}>
              {data.lmtdGrowthPercentage || 0}
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title={t('dashboard.target')}
              bordered={false}>
              {data.target || 0}
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title={t('dashboard.balanceToDo')}
              bordered={false}>
              {data.balanceToDo || 0}
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title={t('dashboard.lymtdAch')}
              bordered={false}>
              {data.lmtd || 0}
            </Card>
          </Col>
          <Col span={4}>
            <Card
              title={t('dashboard.percanageGrowthOverLymtd')}
              bordered={false}>
              {data.lmtdGrowthPercentage || 0}
            </Card>
          </Col>
        </Row>
      </Components.Card>
    </div>
  );
};
