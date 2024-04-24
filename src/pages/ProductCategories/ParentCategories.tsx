import React, { useEffect, useState } from 'react';
import { fetchParentCategories,updateParentCategories,deleteParentCategories} from '../../services/Category';
import { Category } from '../../models/CategoryModel';
import Components from '../../components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {message } from 'antd';
import Filters from './Filters';
import { useTranslation } from 'react-i18next';

const LIMIT = 10;

const ParentCategories = () => {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchByName, setSearchByName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

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
      dataIndex: '_id',
      key: 'action',
      render: (_id: string) => (
        <div>
          <Components.Button
            icon={<EditOutlined />}
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(_id)}>
            Edit
          </Components.Button>
          <Components.Button icon={<DeleteOutlined />}
          onClick={() => handleDelete(_id)}>
            Delete
          </Components.Button>
        </div>
      ),
    },
  ];

  const getParentCategories = async () => {
    try {
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
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      const response =await deleteParentCategories(_id);
      if (response?.data?.body?.ok === 1) {
        setIsLoading(false);
        message.success(
          response?.data?.body?.message || t('productCategories.productCategoryDeletedSuccessMessage')
        );
        getParentCategories();
      }
    } catch (error: any) {
      setIsLoading(false);
      message.error(
        error?.response?.data?.body?.message || t('productCategories.somethingWentWrong')
      );
    }
  };

  const handleEdit = async (_id: string) => {
    try {
      console.log(_id)
      // const response= await updateParentCategories(_id,data)
    } catch (error) {
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
