import React, { useEffect, useState } from 'react';
import { fetchChildCategories } from '../../services/Category';
import { Category } from '../../models/CategoryModel';
import Components from '../../components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Filters from './Filters';

const LIMIT = 10;

  const ChildCategories = () => {
    // return <div>Child Categories</div>;
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchByName, setSearchByName] = useState<string>();

  const onSearchValueByChangeHandler = (e: { target: { value: string } }) => {
    setSearchByName(e.target.value);
  };

  const columns = [
    {
      title: 'Child Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Components.Text>{name}</Components.Text>,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (name:string) => (
        <div>
          <Components.Button
            icon={<EditOutlined />}
            style={{ marginRight: 10 }}
            >
            Edit
          </Components.Button>
          <Components.Button icon={<DeleteOutlined />}
          >
            Delete
          </Components.Button>
        </div>
      ),
    },
  ];
  
  const getChildCategories = async () => {
    try {
      const response = await fetchChildCategories({
        skip: skip,
        limit: LIMIT,
        requestType: 'dashboard',
        search: searchByName,
      });
      if (response && response.data && response.data.body) {
        setChildCategories(response.data.body);
        // setTotalRecords(response.data.body[0].totalCounts[0]); 
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getChildCategories();
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
