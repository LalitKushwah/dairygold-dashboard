import React, { useEffect, useState } from 'react';
import Components from '../../components';
import { useTranslation } from 'react-i18next';
import { Category } from '../../models/CategoryModel';
import {
  fetchChildCategories,
  fetchParentCategories,
} from '../../services/Category';

interface ProductsFilterProps {
  onSearchByChangeHandler: (event: any) => void;
  onChangeChildCategory: (categoryId: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface ApiResponse {
  data: { body: Category[]; message: string; status: number };
}
export const ProductsFilter: React.FC<ProductsFilterProps> = (props) => {
  const { t } = useTranslation();
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [parentCateoryDefaultValue, setParentCateoryDefaultValue] =
    useState('');
  const [childCateoryDefaultValue, setChildCateoryDefaultValue] =
    useState<string>('');

  useEffect(() => {
    onFetchParentCategories();
  }, []);

  const onChangeParentCategory = (parentCategoryId: string) => {
    onFetchChildCategory(parentCategoryId);
  };

  const onFetchChildCategory = (parentCategoryId: string) => {
    props.setIsLoading(true);
    fetchChildCategories(parepareQuery(), parentCategoryId).then(
      (response: ApiResponse) => {
        props.setIsLoading(false);
        if (response?.data?.status === 200) {
          const categories: Category[] = response.data.body;
          categories.map((category: Category, index: number) => {
            category.label = category.name;
            category.value = category._id;
            category.key = index;
            return category;
          });
          setChildCateoryDefaultValue(categories[0]._id);
          setChildCategories(categories);
          props.onChangeChildCategory(categories[0]._id);
        }
      }
    );
  };

  const onFetchParentCategories = () => {
    props.setIsLoading(true);
    fetchParentCategories(parepareQuery()).then((response: ApiResponse) => {
      props.setIsLoading(false);
      if (response?.data?.status === 200) {
        let categories: Category[] = response.data.body;
        setParentCateoryDefaultValue(categories[0]._id);
        setParentCategories(response.data.body);
        onFetchChildCategory(categories[0]._id);
        categories.map((category: Category, index: number) => {
          category.label = category.name;
          category.value = category._id;
          category.key = index;
          return category;
        });
        setParentCategories(categories);
      }
    });
  };

  const parepareQuery = () => {
    let query = {
      skip: 0,
      limit: 40,
    };
    return query;
  };

  return (
    <div className='Products-Filter-Container'>
      <Components.Input
        className='Products-Filters-Input'
        size='large'
        onChange={props.onSearchByChangeHandler}
        placeholder={t('products.searchByInputPlaceholder')}></Components.Input>
      <Components.Select
        size='large'
        value={parentCateoryDefaultValue}
        className='Products-Filters-Select'
        options={parentCategories || []}
        onChange={onChangeParentCategory}
      />
      <Components.Select
        size='large'
        value={childCateoryDefaultValue}
        className='Products-Filters-Select'
        options={childCategories || []}
        onChange={props.onChangeChildCategory}
      />
    </div>
  );
};
