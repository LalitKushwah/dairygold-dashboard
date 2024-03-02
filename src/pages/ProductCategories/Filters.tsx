import React, { useState } from 'react';
import Components from '../../components';
import { useTranslation } from 'react-i18next';

const Filters = ({
  searchByValue,
  onSearchValueByChangeHandler,
  isChild,
}: any) => {
  const { t } = useTranslation();
  const [addNew, setAddNew] = useState<boolean>(false);

  return (
    <>
      <Components.Input
        className='Order-Filters-Input'
        value={searchByValue}
        size='large'
        onChange={onSearchValueByChangeHandler}
        placeholder={'Search by name'}></Components.Input>
      <Components.Button
        size='large'
        onClick={() => {
          setAddNew(true);
        }}>
        Add New
      </Components.Button>
      <Components.Modal
        open={addNew}
        onCancel={() => setAddNew(false)}
        title='Add New Parent Category'>
        <Components.Input placeholder='Enter Category Name Here'></Components.Input>
        {isChild && (
          <Components.Input placeholder='Enter Child Category Name Here'></Components.Input>
        )}
      </Components.Modal>
    </>
  );
};

export default Filters;
