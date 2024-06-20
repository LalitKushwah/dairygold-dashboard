import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import Components from '../../components';
import './ChildCategories.css';
import { fetchParentCategories } from '../../services/Category';
import { Category } from '../../models/CategoryModel';

const LIMIT = 10;

const ChildCategories = () => {
  const [searchByName, setSearchByName] = useState<string>();
  const [skip, setSkip] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState<any>();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getParentCategories();
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [skip, searchByName]);

  const onSearchValueByChangeHandler = (e: { target: { value: string } }) => {
    setSearchByName(e.target.value);
  };

  const getParentCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetchParentCategories({
        skip: skip,
        limit: LIMIT,
        requestType: 'dashboard',
        search: searchByName,
      });
      if (response && response.data && response.data.body) {
        const list = response.data.body[0].data || [];
        list.map((item: any) => {
          item.label = item.name;
          item.value = item.name;
        });
        setParentCategories(response.data.body[0].data);
        console.log('=== 44 ===', list[0]);
        setSelectedParentCategory(list[0]);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  };
  const onParentChangeHandler = (value: any) => {
    console.log('==== 52 ===', value);
    setParentCategories(value);
  };

  return (
    <div className='Main-Container'>
      <div className='Filter-Container'>
        <Filters
          searchByValue={searchByName}
          onSearchValueByChangeHandler={onSearchValueByChangeHandler}
        />
      </div>

      <Components.Select
        size='large'
        value={selectedParentCategory}
        loading={isLoading}
        options={parentCategories || []}
        onChange={onParentChangeHandler}
      />
    </div>
  );
};

export default ChildCategories;
