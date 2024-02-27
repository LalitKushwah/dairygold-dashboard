import React, { useState } from 'react';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { ProductsFilter } from './Filters';
import { Layout } from 'antd';
import NavBar from '../../common/NavBar/NavBar';
import { ProductsData } from './Data';
import './Products.css';
import {
  EditOutlined,
  FileExcelOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProductForm } from './Form';

interface ProductsProps {}
export const Products: React.FC<ProductsProps> = () => {
  const [searchByValue, setSearchByValue] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleChildCategoryChanges = (categoryId: string) => {
    setCategoryId(categoryId);
  };
  const handleSearchByValueChanges = (event: any) => {
    setSearchByValue(event?.target?.value);
  };

  const onAddProduct = () => {
    setIsOpenAddEditModal(true);
  };

  return (
    <Layout className='Products-Page-Container'>
      <NavBar activeKey={'6'} />
      <Layout>
        <PageHeader
          title='Products'
          primaryBtnText='Add Product'
          secondaryBtnText='Export'
          tertiaryBtnText='Upload Product'
          primaryButtonIcon={<PlusOutlined />}
          secondaryButtonIcon={<FileExcelOutlined />}
          tertiaryButtonIcon={<EditOutlined />}
          primartBtnAction={onAddProduct}></PageHeader>
        <ProductsFilter
          setIsLoading={setIsLoading}
          onChangeChildCategory={handleChildCategoryChanges}
          onSearchByChangeHandler={handleSearchByValueChanges}></ProductsFilter>
        <ProductsData
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          searchByValue={searchByValue}
          categoryId={categoryId}
          setIsOpenAddEditModal={setIsOpenAddEditModal}
        />
        <ProductForm
          isOpen={isOpenAddEditModal}
          isEdit={isEdit}
          onCancel={() => {setIsOpenAddEditModal(false)}}
        />
      </Layout>
    </Layout>
  );
};
