import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import Components from '../../components';
import './ChildCategories.css';
import {
  fetchChildCategories,
  fetchParentCategories,
} from '../../services/Category';
import { Category } from '../../models/CategoryModel';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const LIMIT = 10;

const ChildCategories = () => {
  const [searchByName, setSearchByName] = useState<string>();
  const [skip, setSkip] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState<any>();
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Components.Text>{name}</Components.Text>,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <div>
          <Components.Button
            icon={<EditOutlined />}
            style={{ marginRight: 10 }}>
            Edit
          </Components.Button>
          <Components.Button icon={<DeleteOutlined />}>
            Delete
          </Components.Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getParentCategories();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (selectedParentCategory && selectedParentCategory._id) {
        getChildCategories();
      }
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [selectedParentCategory, skip, searchByName]);

  const onSearchValueByChangeHandler = (e: { target: { value: string } }) => {
    setSearchByName(e.target.value);
  };

  const getParentCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetchParentCategories({
        skip: 0,
        limit: 100,
        requestType: 'dashboard',
        search: searchByName,
      });
      if (response && response.data && response.data.body) {
        const list = response.data.body[0].data.map((item: any) => ({
          ...item,
          label: item.name,
          value: item.name,
        }));
        setParentCategories(list);
        setSelectedParentCategory(list[0]);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  };

  const getChildCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetchChildCategories(
        {
          skip,
          limit: LIMIT,
          requestType: 'dashboard',
          search: searchByName,
        },
        selectedParentCategory._id
      );
      if (response && response.data && response.data.body) {
        const list = response.data.body[0].data.map((item: any) => ({
          ...item,
          label: item.name,
          value: item.name,
        }));
        setChildCategories(list);
        setTotalRecords(response.data.body[0].totalRecords);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  };

  const onParentChangeHandler = (value: any) => {
    const selectedParent = parentCategories.find(
      (parent) => parent.name === value
    );
    setSelectedParentCategory(selectedParent);
  };

  const onPageChangeHandler = (page: number) => {
    setSkip((page - 1) * LIMIT);
  };

  return (
    <>
      <div className='Main-Container'>
        <div className='Filter-Container'>
          <Filters
            searchByValue={searchByName}
            onSearchValueByChangeHandler={onSearchValueByChangeHandler}
          />
        </div>

        <Components.Select
          size='large'
          className='ParentCategory-Select'
          value={selectedParentCategory?.name}
          loading={isLoading}
          options={parentCategories}
          onChange={onParentChangeHandler}
        />
      </div>
      <Components.Table
        columns={columns}
        rowKey={'_id'}
        loading={isLoading}
        dataSource={childCategories}
        pagination={false}
        paginationProps={{
          defaultCurrent: 1,
          total: totalRecords,
          onChange: onPageChangeHandler,
          showSizeChanger: false,
        }}
      />
    </>
  );
};

export default ChildCategories;
