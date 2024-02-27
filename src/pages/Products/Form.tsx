import React, { useState } from 'react';
import Components from '../../components';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import {
  BarcodeOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Category } from '../../models/CategoryModel';

interface ProductFormProps {
  isEdit: boolean;
  isOpen: boolean;
  onCancel: () => void;
}
export const ProductForm: React.FC<ProductFormProps> = (props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm<any>();
  const [parentCategories, setParentCategories] = useState<Category[]>([]);

  const onAddProduct = () => {};

  const onUpdateProduct = () => {};
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
                data-testid='form-parent-category-list'
                filterOption={(input, option: any) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </Components.FormItem>
          </Components.Col>
          <Components.Col span={12}>
            <Components.Title level={5}>
              {t('products.childCategory')}
            </Components.Title>
            <Components.FormItem
              name='productCategoryId'
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
                options={parentCategories}
                data-testid='form-child-category-list'
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
              <Components.Select
                showSearch={true}
                suffixIcon={<UserOutlined />}
                placeholder={t('products.selectFocusedPack')}
                size='middle'
                options={parentCategories}
                data-testid='form-parent-category-list'
                filterOption={(input, option: any) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </Components.FormItem>
          </Components.Col>
        </Components.Row>
      </Components.Form>
    </Components.Modal>
  );
};
