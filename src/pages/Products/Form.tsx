import React, { useEffect, useState } from 'react';
import Components from '../../components';
import { useTranslation } from 'react-i18next';
import { Form, message } from 'antd';
import {
  BarcodeOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Category } from '../../models/CategoryModel';
import {
  fetchChildCategories,
  fetchParentCategories,
} from '../../services/Category';
import { ProductModel, UpdateProduct } from '../../models/ProductModel';
import { addProduct, updateProduct } from '../../services/Products';

interface ProductFormProps {
  isEdit: boolean;
  isOpen: boolean;
  onCancel: () => void;
  setIsLoading: (isLoading: boolean) => void;
  selectedProduct: ProductModel;
  onFetchProducts: () => void;
}
interface ApiResponse {
  data: { body: Category[]; message: string; status: number };
}
export const ProductForm: React.FC<ProductFormProps> = (props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ProductModel>();
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<Category[]>([]);

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
          setChildCategories(categories);
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

  const onChangeParentCategory = (parentCategoryId: string) => {
    onFetchChildCategory(parentCategoryId);
  };

  const parepareQuery = () => {
    let query = {
      skip: 0,
      limit: 40,
    };
    return query;
  };

  const onAddProduct = async () => {
    setIsLoading(true);
    await validateForm();
    const formValue = handleFocusedPackValue(form.getFieldsValue());
    formValue.priceType = 'Standard Price';
    formValue.lastUpdatedAt = new Date().getTime();
    delete formValue.isFocusedPack;
    addProduct(formValue)
      .then(
        (response: {
          data: { body: ProductModel[]; status: number; message: string };
        }) => {
          if (response?.data?.status === 200) {
            message.success(response.data.message);
            setIsLoading(false);
            form.resetFields();
            props.onCancel();
            props.onFetchProducts();
          }
        }
      )
      .catch((error) => setIsLoading(false));
  };

  const onUpdateProduct = async () => {
    setIsLoading(true);
    try {
      await form.validateFields();
    } catch (error) {
      setIsLoading(false);
      return;
    }
    const formValue = handleFocusedPackValue(form.getFieldsValue());
    const toBeUpdateProduct: UpdateProduct = {
      productId: formValue.productCode,
      name: formValue.name,
      price: formValue.price,
      productCode: formValue.productCode,
      productSysCode: formValue.productSysCode,
      parentCategoryId: formValue.parentCategoryId,
      categoryId: formValue.categoryId,
      isFocusedPack: formValue.isFocusedPack,
    };
    updateProduct(toBeUpdateProduct)
      .then((response: any) => {
        setIsLoading(false);
        props.onFetchProducts();
        props.onCancel();
      })
      .catch((error) => setIsLoading(false));
  };

  const validateForm = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      setIsLoading(false);
      return;
    }
  };

  const handleFocusedPackValue = (formValue: ProductModel) => {
    if (formValue.isFocusedPack === true) {
      formValue.isFocusedPack = 'Y';
    } else {
      formValue.isFocusedPack = 'N';
    }
    return formValue;
  };
  useEffect(() => {
    if (props.isOpen) {
      onFetchParentCategories();
      if (form.getFieldsValue()) {
        form.resetFields();
      }
      if (props.isEdit) {
        if (props.selectedProduct.isFocusedPack === 'Y') {
          props.selectedProduct.isFocusedPack = true;
        } else {
          props.selectedProduct.isFocusedPack = false;
        }
        form.setFieldsValue(props.selectedProduct);
      }
    }
  }, [props.isOpen]);
  return (
    <Components.Modal
      title={
        props.isEdit ? t('products.editProduct') : t('products.addProduct')
      }
      className='Add-Product-Modal'
      open={props.isOpen}
      onCancel={props.onCancel}
      maskClosable={false}
      footer={[
        <Components.Button
          key={'cancel'}
          onClick={props.onCancel}>
          {t('products.cancel')}
        </Components.Button>,
        <Components.Popconfirm
          key={'submit'}
          title={t('products.submitConfirmationDesc')}
          buttontext={t('products.submit')}
          htmlType='submit'
          id='submit'
          onConfirm={props.isEdit ? onUpdateProduct : onAddProduct}
          loading={isLoading}></Components.Popconfirm>,
      ]}>
      <Components.Form
        form={form}
        name='user-form'>
        <Components.Row
          gutter={[16, 16]}
          className='Product-Form-Row'>
          <Components.Col span={12}>
            <Components.Title level={5}>
              {t('products.parentCategory')}
            </Components.Title>
            <Components.FormItem
              name='parentCategoryId'
              rules={[
                {
                  required: true,
                  message: t('products.parentCategoryRequired'),
                },
              ]}>
              <Components.Select
                showSearch={true}
                suffixIcon={<EnvironmentOutlined />}
                placeholder={t('products.selectParentCategory')}
                size='middle'
                options={parentCategories}
                data-testid='formParentCategoryDropdown'
                id='parentDropdown'
                filterOption={(input, option: any) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={onChangeParentCategory}
              />
            </Components.FormItem>
          </Components.Col>
          <Components.Col span={12}>
            <Components.Title level={5}>
              {t('products.childCategory')}
            </Components.Title>
            <Components.FormItem
              name='categoryId'
              rules={[
                {
                  required: true,
                  message: t('products.childCategoryRequired'),
                },
              ]}>
              <Components.Select
                showSearch={true}
                suffixIcon={<EnvironmentOutlined />}
                placeholder={t('products.selectChildCategory')}
                size='middle'
                options={childCategories}
                data-testid='formChildCategoryDropdown'
                filterOption={(input, option: any) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </Components.FormItem>
          </Components.Col>
        </Components.Row>

        <Components.Row
          gutter={[16, 16]}
          className='Product-Form-Row'>
          <Components.Col span={12}>
            <Components.Title level={5}>{t('products.name')}</Components.Title>
            <Components.FormItem
              name='name'
              rules={[
                { required: true, message: t('products.nameIsRequired') },
              ]}>
              <Components.Input
                prefix={<SolutionOutlined />}
                placeholder={t('products.enterName')}
                size='middle'
                name='name'
              />
            </Components.FormItem>
          </Components.Col>
          <Components.Col span={12}>
            <Components.Title level={5}>
              {t('products.productCode')}
            </Components.Title>
            <Components.FormItem
              name='productCode'
              rules={[
                {
                  required: true,
                  message: t('products.productCodeIsRequired'),
                },
              ]}>
              <Components.Input
                prefix={<BarcodeOutlined />}
                placeholder={t('products.enterProductCode')}
                size='middle'
                name='productCode'
              />
            </Components.FormItem>
          </Components.Col>
        </Components.Row>

        <Components.Row
          gutter={[16, 16]}
          className='Product-Form-Row'>
          <Components.Col span={12}>
            <Components.Title level={5}>
              {t('products.productSysCode')}
            </Components.Title>
            <Components.FormItem
              name='productSysCode'
              rules={[
                {
                  required: true,
                  message: t('products.productSysCodeIsRequired'),
                },
              ]}>
              <Components.Input
                prefix={<BarcodeOutlined />}
                placeholder={t('products.enterProductSysCode')}
                size='middle'
                name='productSysCode'
              />
            </Components.FormItem>
          </Components.Col>
          <Components.Col span={12}>
            <Components.Title level={5}>{t('products.price')}</Components.Title>
            <Components.FormItem
              name='price'
              rules={[
                { required: true, message: t('products.priceIsRequired') },
              ]}>
              <Components.Input
                type='number'
                prefix={<DollarCircleOutlined />}
                placeholder={t('products.enterPrice')}
                size='middle'
                name='price'
              />
            </Components.FormItem>
          </Components.Col>
        </Components.Row>

        <Components.Row
          gutter={[16, 16]}
          className='Product-Form-Row'>
          <Components.Col span={12}>
            <Components.Title level={5}>
              {t('products.packType')}
            </Components.Title>
            <Components.FormItem
              name='packType'
              rules={[
                { required: true, message: t('products.packTypeIsRequired') },
              ]}>
              <Components.Input
                prefix={<SolutionOutlined />}
                placeholder={t('products.enterPackType')}
                size='middle'
                name='packType'
              />
            </Components.FormItem>
          </Components.Col>
          <Components.Col span={12}>
            <Components.Title level={5}>
              {t('products.netWeight')}
            </Components.Title>
            <Components.FormItem
              name='netWeight'
              rules={[
                {
                  required: true,
                  message: t('products.netWeightIsRequired'),
                },
              ]}>
              <Components.Input
                type='number'
                prefix={<SolutionOutlined />}
                placeholder={t('products.enterNetWeight')}
                size='middle'
                name='netWeight'
              />
            </Components.FormItem>
          </Components.Col>
        </Components.Row>
        <Components.Row
          gutter={[16, 16]}
          className='Product-Form-Row'>
          <Components.Col span={12}>
            <Components.Title level={5}>
              {t('products.currentCaseSize')}
            </Components.Title>
            <Components.FormItem
              name='currentCaseSize'
              rules={[
                {
                  required: true,
                  message: t('products.currentCaseSizeIsRequired'),
                },
              ]}>
              <Components.Input
                prefix={<SolutionOutlined />}
                placeholder={t('products.enterCurrentCaseSize')}
                size='middle'
                name='currentCaseSize'
                type='number'
              />
            </Components.FormItem>
          </Components.Col>
          <Components.Col span={12}>
            <Components.Title level={5}>{t('products.unit')}</Components.Title>
            <Components.FormItem
              name='unit'
              rules={[
                {
                  required: true,
                  message: t('products.unitIsRequired'),
                },
              ]}>
              <Components.Input
                prefix={<SolutionOutlined />}
                placeholder={t('products.enterUnit')}
                size='middle'
                name='unit'
              />
            </Components.FormItem>
          </Components.Col>
        </Components.Row>
        <Components.Row className='Product-Form-Row'>
          <Components.Col span={24}>
            <Components.Title level={5}>
              {t('products.focusedPack')}
            </Components.Title>
            <Components.FormItem name='isFocusedPack'>
              <Components.Switch data-testid='formFocusedPackToggleSwitch'></Components.Switch>
            </Components.FormItem>
          </Components.Col>
        </Components.Row>
      </Components.Form>
    </Components.Modal>
  );
};
