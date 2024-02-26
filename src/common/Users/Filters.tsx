import React, { ChangeEvent, useEffect, useState } from 'react';
import Components from '../../components';
import { getProvinceList } from '../../services/User';
import './Users.css';
import { useTranslation } from 'react-i18next';

interface UserFilterProps {
  onSearchByChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onProvinceFilterChangeHandler: (params: string) => void;
}

export const UserFilter: React.FC<UserFilterProps> = (props) => {
  const [provinceList, setProvinceList] = useState<[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchProvicesList();
  }, []);

  const fetchProvicesList = async () => {
    try {
      const response = await getProvinceList();
      if (
        response &&
        response.data &&
        response.data.body &&
        response.data.body.provinces
      ) {
        const provinces = response.data.body.provinces.map(
          (province: string) => {
            return {
              label: province,
              value: province,
            };
          }
        );
        provinces.unshift({
          label: t('users.allProvinces'),
          value: 'All',
          externalId: 'All',
          name: 'Province',
        });
        setProvinceList(provinces);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Users-Filter-Container'>
      <Components.Input
        className='User-Filters-Input'
        size='large'
        onChange={props.onSearchByChangeHandler}
        placeholder={t('users.searchByName')}
        name='searchByName'></Components.Input>
      <Components.Select
        className='User-Filters-Select'
        showSearch={true}
        size='large'
        defaultValue={'All'}
        options={provinceList || []}
        onChange={props.onProvinceFilterChangeHandler}
        data-testid="province-list"
        filterOption={(input: string, option: any) =>
          option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      />
    </div>
  );
};
