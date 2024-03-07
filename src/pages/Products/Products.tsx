import React, { useRef, useState } from 'react';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { ProductsFilter } from './Filters';
import { Layout } from 'antd';
import NavBar from '../../common/NavBar/NavBar';
import ProductsData from './Data';
import './Products.css';
import {
  EditOutlined,
  FileExcelOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProductForm } from './Form';
import { ProductModel } from '../../models/ProductModel';
import { useTranslation } from 'react-i18next';

interface ProductsProps {}
export const Products: React.FC<ProductsProps> = () => {
  const [searchByValue, setSearchByValue] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel>(
    {} as ProductModel
  );
  let debounceTimeId: NodeJS.Timeout;
  const { t } = useTranslation();

  const handleChildCategoryChanges = (categoryId: string) => {
    setCategoryId(categoryId);
  };
  const handleSearchByValueChanges = (event: any) => {
    const inputValue = event?.target?.value;
    clearTimeout(debounceTimeId);
    debounceTimeId = setTimeout(() => {
      setSearchByValue(inputValue);
    }, 1000);
  };

  const onAddProduct = () => {
    setIsEdit(false);
    setIsOpenAddEditModal(true);
  };
  const childRef = useRef<any>();
  // Calling user data components method
  const onFetchProducts = () => {
    if (childRef.current) {
      childRef.current.onFetchProducts();
    }
  };

  return (
    <Layout className='Products-Page-Container'>
      <NavBar activeKey={'6'} />
      <Layout>
        <PageHeader
          title={t('products.pageTitle')}
          primaryBtnText={t('products.addProduct')}
          secondaryBtnText={t('products.export')}
          tertiaryBtnText={t('products.uploadProducts')}
          primaryButtonIcon={<PlusOutlined />}
          secondaryButtonIcon={<FileExcelOutlined />}
          tertiaryButtonIcon={<EditOutlined />}
          primaryBtnAction={onAddProduct}
          primaryBtnId='addProduct'></PageHeader>
        <ProductsFilter
          setIsLoading={setIsLoading}
          onChangeChildCategory={handleChildCategoryChanges}
          onSearchByChangeHandler={handleSearchByValueChanges}></ProductsFilter>
        <ProductsData
          ref={childRef}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          searchByValue={searchByValue}
          categoryId={categoryId}
          setIsOpenAddEditModal={setIsOpenAddEditModal}
          setIsEdit={setIsEdit}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
        <ProductForm
          isOpen={isOpenAddEditModal}
          isEdit={isEdit}
          setIsLoading={setIsLoading}
          selectedProduct={selectedProduct}
          onCancel={() => {
            setIsOpenAddEditModal(false);
          }}
          onFetchProducts={onFetchProducts}
        />
      </Layout>
    </Layout>
  );
};
