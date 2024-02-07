import React, { useEffect, useState } from 'react';
import Components from '../../components';
import { UserData, getEmptyUserStructure } from '../../models/UserLoginModel';
import { getSalesmansList } from '../../services/User';
import { orderStatusOptions } from './util';
import './Orders.css';
import { useTranslation } from 'react-i18next';

interface OrderFiltersIProps {
  onOrderStatusChangeHandler: (param: string) => void;
  onSearchByChangeHandler: any;
  onSMFilterChangeHandler: (param: string) => void;
  searchByValue: string;
}

export const OrderFilters: React.FC<OrderFiltersIProps> = ({
  onOrderStatusChangeHandler,
  onSearchByChangeHandler,
  onSMFilterChangeHandler,
  searchByValue,
}) => {
  const [salesmanList, setSalesmanList] = useState<UserData[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getSalesmanListData();
  }, []);

  const getSalesmanListData = async () => {
    try {
      const response = await getSalesmansList();
      if (response.data && response.data.body) {
        const salesmanDataList = response.data.body || [];
        const userStruct = getEmptyUserStructure();
        salesmanDataList.unshift({
          ...userStruct,
          label: 'All Salesman',
          value: 'All Salesman',
          externalId: 'All',
          name: 'Salesman',
        });
        salesmanDataList.map((salesman: UserData) => {
          salesman['label'] = `${salesman.externalId} - ${salesman.name}`;
          salesman['value'] = salesman.externalId;
          return salesman;
        });
        setSalesmanList(salesmanDataList);
      }
    } catch (ex) {}
  };

  return (
    <div className='Order-Filters-Container'>
      <Components.Input
        className='Order-Filters-Input'
        value={searchByValue}
        size='large'
        onChange={onSearchByChangeHandler}
        placeholder={t('orders.searchByInputPlaceholder')}></Components.Input>
      {salesmanList && salesmanList.length ? (
        <Components.Select
          size='large'
          defaultValue={'All'}
          className='Order-Filters-Select'
          options={salesmanList || []}
          onChange={onSMFilterChangeHandler}
        />
      ) : undefined}
      <Components.Select
        size='large'
        defaultValue={'All'}
        className='Order-Filters-Select'
        options={orderStatusOptions}
        onChange={onOrderStatusChangeHandler}
      />
    </div>
  );
};
