import React, { useEffect, useState } from 'react';
import { fetchParentCategories } from '../../services/Category';
import { Category } from '../../models/CategoryModel';
import Components from '../../components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
  import Filters from './Filters';

const LIMIT = 10;

const ParentCategories = () => {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchByName, setSearchByName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSearchValueByChangeHandler = (e: { target: { value: string } }) => {
    setSearchByName(e.target.value);
  };

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
      render: (name: string) => (
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
        setParentCategories(response.data.body[0].data);
        setTotalRecords(response.data.body[0].totalCounts[0]);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getParentCategories();
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [skip, searchByName]);

  const onPageChangeHandler = (page: number, pageSize: number) => {
    if (page === 1) {
      setSkip(0);
    } else {
      setSkip((page - 1) * 10);
    }
  };

  return (
    <>
      <Filters
        searchByValue={searchByName}
        onSearchValueByChangeHandler={onSearchValueByChangeHandler}
      />
      <Components.Table
        columns={columns}
        rowKey={'_id'}
        loading={isLoading}        
        dataSource={parentCategories}
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

export default ParentCategories;
