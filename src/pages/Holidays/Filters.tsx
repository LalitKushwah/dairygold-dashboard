import React, { useState } from 'react';
import Components from '../../components';
import { useTranslation } from 'react-i18next';
import { getMonthNames } from '../../utils/common';
import './Holidays.css';

const Filters = ({
  searchByValue,
  onMonthChangeHandler,
  onSearchValueByChangeHandler,
}: any) => {
  const { t } = useTranslation();
  const monthsList = getMonthNames(true);

  return (
    <div className='HolidayFilter-Container'>
      {/* <Components.Input
        className='Order-Filters-Input'
        value={searchByValue}
        size='large'
        onChange={onSearchValueByChangeHandler}
        placeholder={'Search by name'}></Components.Input> */}

      <Components.Select
        size='large'
        className='ParentCategory-Select'
        value={monthsList[0]?.label}
        options={monthsList}
        onChange={onMonthChangeHandler}
      />
    </div>
  );
};

export default Filters;
