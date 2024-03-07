import { useTranslation } from 'react-i18next';

import React, {
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Components from '../../components';
import { Button, Dropdown, MenuProps, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CrudPermissionwithRBAC from '../../common/Permission/CrudPermission';
import {
  CrudOperation,
  currency,
  formattedNumber,
  onPageChangeHandler,
} from '../../utils/common';
import { ProductModel } from '../../models/ProductModel';
import { deleteProduct, fetchProducts } from '../../services/Products';

interface ProductsDataProps {
  categoryId: string;
  searchByValue?: string;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  setIsOpenAddEditModal: (isOpen: boolean) => void;
  setIsEdit: (idEdit: boolean) => void;
  setSelectedProduct: (product: ProductModel) => void;
  selectedProduct: ProductModel;
  ref: MutableRefObject<ChildRef>;
}
interface ChildRef {
  onFetchProducts: () => void;
}
interface ApiResponse {
  data: {
    body: [{ data: ProductModel[]; totalCounts: Array<number> }];
    message: string;
    status: number;
  };
}
const ProductsData: React.ForwardRefRenderFunction<
  ChildRef,
  ProductsDataProps
> = (props, ref) => {
  const ActionDropdownWithRBAC = CrudPermissionwithRBAC(
    Dropdown,
    CrudOperation.CREATE
  );
  const EditWithRBAC = CrudPermissionwithRBAC(
    Components.Button,
    CrudOperation.UPDATE
  );
  const DeleteWithRBAC = CrudPermissionwithRBAC(
    Components.Popconfirm,
    CrudOperation.DELETE
  );

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const { t } = useTranslation();

  const onEditProduct = () => {
    props.setIsEdit(true);
    props.setIsOpenAddEditModal(true);
  };
  const onDeleteProduct = () => {
    deleteProduct(props?.selectedProduct?._id).then(
      (response: {
        data: { body: { n: number; ok: number }; status: number };
      }) => {
        if (response?.data?.body?.n === 1) {
          message.success('Product deleted successfully.');
          onFetchProducts();
        }
      }
    );
  };

  useImperativeHandle(ref, () => ({
    onFetchProducts,
  }));

  let columns = [
    {
      title: t('products.productCode'),
      dataIndex: 'productCode',
      key: 'productCode',
      render: (productCode: string) => (
        <Components.Text copyable>{productCode}</Components.Text>
      ),
    },
    {
      title: t('products.productSysCode'),
      dataIndex: 'productSysCode',
      key: 'productSysCode',
    },
    {
      title: t('products.priceType'),
      dataIndex: 'priceType',
      key: 'priceType',
    },
    {
      title: t('products.name'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Components.Text copyable>{name}</Components.Text>
      ),
    },
    {
      title: t('products.netWeight'),
      dataIndex: 'netWeight',
      key: 'netWeight',
    },
    {
      title: t('products.currentCaseSize'),
      dataIndex: 'currentCaseSize',
      key: 'currentCaseSize',
    },
    {
      title: `${t('products.price')} (${currency})`,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: t('products.action'),
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any) => (
        <ActionDropdownWithRBAC
          arrow={true}
          menu={{ items }}
          placement='topLeft'
          autoAdjustOverflow={true}>
          <Button
            id='actionBtn'
            onMouseEnter={() => {
              props.setSelectedProduct(record);
            }}>
            <EditOutlined />
          </Button>
        </ActionDropdownWithRBAC>
      ),
    },
  ];
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <EditWithRBAC>{t('products.edit')}</EditWithRBAC>,
      onClick: onEditProduct,
    },
    {
      key: '2',
      label: (
        <DeleteWithRBAC
          arrow={false}
          placement='left'
          key='confirm'
          className='Popconfirm-Button'
          title={t('products.confirmation')}
          description={`${t('products.deleteConfirmationDesc')} ${
            props.selectedProduct.name
          }?`}
          buttontext={t('products.delete')}
          okText={t('products.yes')}
          cancelText={t('products.no')}
          onConfirm={onDeleteProduct}></DeleteWithRBAC>
      ),
      danger: true,
    },
  ];

  const onFetchProducts = () => {
    props.setIsLoading(true);
    fetchProducts(prepareQuery(), props.categoryId)
      .then((response: ApiResponse) => {
        props.setIsLoading(false);
        if (response.data.status === 200) {
          const products = response.data.body[0].data;
          products.forEach((product: ProductModel, index: number) => {
            product.key = index;
            product.netWeight = formattedNumber(Number(product.netWeight), 2);
            product.currentCaseSize = Number(
              formattedNumber(product.currentCaseSize, 2)
            );
          });
          setTotalRecords(response.data.body[0].totalCounts[0]);
          setProducts(products);
        }
      })
      .catch((error: any) => {
        props.setIsLoading(false);
        console.error(error);
      });
  };

  const prepareQuery = () => {
    let query: any = {
      skip: skip,
      limit: 10,
      requestType: 'dashboard',
      userType: 'admin',
    };
    if (props.searchByValue) {
      query.search = props.searchByValue;
    }
    return query;
  };

  useEffect(() => {
    if (props.searchByValue || props.categoryId) {
      onFetchProducts();
    }
  }, [props.searchByValue, props.categoryId]);

  return (
    <div className='Products-Data-Container'>
      <Components.Table
        columns={columns}
        dataSource={products}
        loading={props.isLoading}
        pagination={false}
        paginationProps={{
          defaultCurrent: 1,
          total: totalRecords,
          onChange: () => {
            setSkip(onPageChangeHandler(skip));
          },
          showSizeChanger: false,
        }}
      />
    </div>
  );
};
export default React.forwardRef(ProductsData);
