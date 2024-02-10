import {
  ApartmentOutlined,
  BarChartOutlined,
  HolderOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  SyncOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { TreeDataNode } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Components from '../../components';
import { confirmProps, handleConfirmPropsTranslation } from './utils';
import { HTTP_METHOD } from '../../utils/common';
import CrudPermissionwithRBAC from '../../common/Permission/CrudPermission';

type SchedulerTreeProps = {
  confirmHandler: (identifier: string, method: string) => void;
  showModal: () => void;
};
const SchedulersTree: React.FC<SchedulerTreeProps> = ({
  confirmHandler,
  showModal,
}) => {
  const { t } = useTranslation();
  const ButtonWithRBAC = CrudPermissionwithRBAC(Components.Button, 'delete');
  const confirmPropsValue: any = handleConfirmPropsTranslation(confirmProps);
  const LeftSideTreeData: TreeDataNode[] = [
    {
      title: t('schedulers.products'),
      key: '1',
      icon: <StarOutlined />,
      children: [
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('CREATE_PRODUCT', HTTP_METHOD.POST)
              }
              icon={<PlusCircleOutlined />}
              buttontext='schedulers.createInApp'
              id='create-product'></Components.Popconfirm>
          ),
          key: '1-0',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_PRODUCT', HTTP_METHOD.POST)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateInApp'
              id='update-product'></Components.Popconfirm>
          ),
          key: '1-1',
          icon: '',
        },
      ],
    },
    {
      title: t('schedulers.customers'),
      key: '2',
      icon: <UsergroupAddOutlined />,
      children: [
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('CREATE_CUSTOMER', HTTP_METHOD.POST)
              }
              icon={<PlusCircleOutlined />}
              buttontext='schedulers.createInApp'
              id='create-customer'></Components.Popconfirm>
          ),
          key: '2-0',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_CUSTOMER', HTTP_METHOD.POST)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateInApp'
              id='update-customer'></Components.Popconfirm>
          ),
          key: '2-1',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_SALES_TREE', HTTP_METHOD.GET)
              }
              icon={<ApartmentOutlined />}
              buttontext='schedulers.updateSalesTree'
              id='update-sales-tree'></Components.Popconfirm>
          ),
          key: '2-2',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_CUSTOMER_DASHBOARD', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateDashboard'
              id='update-customer-dashboard'></Components.Popconfirm>
          ),
          key: '2-3',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_PARENT_ID', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateParentId'
              id='update-parent-id'></Components.Popconfirm>
          ),
          key: '2-4',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_CUSTOMER_STATEMENT', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateStatement'
              id='update-customer-statement'></Components.Popconfirm>
          ),
          key: '2-5',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler(
                  'UPDATE_CUSTOMER_PENDING_INVOICE',
                  HTTP_METHOD.GET
                )
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updatePendingInvoice'
              id='update-customer-invoice'></Components.Popconfirm>
          ),
          key: '2-6',
          icon: '',
        },
      ],
    },
    {
      title: t('schedulers.nonCustomers'),
      key: '3',
      icon: <UsergroupAddOutlined />,
      children: [
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_NON_CUSTOMER_DASHBOARD', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateDashboard'
              id='update-non-customer-dashboard'></Components.Popconfirm>
          ),
          key: '3-0',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler(
                  'MAP_CATEGORIES_TO_SALES_EXECUTIVE',
                  HTTP_METHOD.GET
                )
              }
              icon={<ApartmentOutlined />}
              buttontext='schedulers.mapCategoryToSE'
              id='map-cartegory-to-sm'></Components.Popconfirm>
          ),
          key: '3-1',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('MAP_SALESMAN_TO_SALESMANAGER', HTTP_METHOD.GET)
              }
              icon={<ApartmentOutlined />}
              buttontext='schedulers.mapSmToSalesman'
              id='map-salesman-to-sm'></Components.Popconfirm>
          ),
          key: '3-2',
          icon: '',
        },
      ],
    },
  ];

  const RightSideTreeData: TreeDataNode[] = [
    {
      title: t('schedulers.orders'),
      key: '1',
      icon: <ShoppingCartOutlined />,
      children: [
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler(
                  'UPDATE_IN_PROGRESS_ORDER_IN_ERP',
                  HTTP_METHOD.GET
                )
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.storeInProgressOrder'
              id='store-inprogress-order'></Components.Popconfirm>
          ),
          key: '1-0',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler(
                  'UPDATE_ORDER_STATUS_BILLED_IN_APP',
                  HTTP_METHOD.GET
                )
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateOrderStatusBilled'
              id='update-order-status-billed'></Components.Popconfirm>
          ),
          key: '1-1',
        },
        {
          title: (
            <ButtonWithRBAC
              danger={true}
              className='Scheduler-button'
              onClick={showModal}
              id='delete-order'>
              {t('schedulers.deleteOrder')}
            </ButtonWithRBAC>
          ),
          key: '1-2',
        },
      ],
    },
    {
      title: t('schedulers.reports'),
      key: '2',
      icon: <BarChartOutlined />,
      children: [
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_CUSTOMER_PERFORMANCE', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateCustomerPerformance'
              id='update-customer-performance'></Components.Popconfirm>
          ),
          key: '2-0',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_SKU_PERFORMANCE', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateSkuPerformance'
              id='update-sku-performance'></Components.Popconfirm>
          ),
          key: '2-1',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_VAN_PERFORMANCE', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateVanPerformance'
              id='update-van-performance'></Components.Popconfirm>
          ),
          key: '2-3',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_FOCUSED_PACK', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateFocusedPack'
              id='update-focused-pack'></Components.Popconfirm>
          ),
          key: '2-4',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_TGT_VS_ACHIEVE', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateTgtVsAchive'
              id='update-target-vs-achive'></Components.Popconfirm>
          ),
          key: '2-5',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_INVOICE_AGAINST_ORDER', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateInvoiceAgainstOrder'
              id='update-invoice-against-order'></Components.Popconfirm>
          ),
          key: '2-6',
          icon: '',
        },
      ],
    },
    {
      title: t('schedulers.others'),
      key: '3',
      icon: <HolderOutlined />,
      children: [
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() => confirmHandler('UPDATE_BANKS', HTTP_METHOD.GET)}
              icon={<SyncOutlined />}
              buttontext='schedulers.updateBank'
              id='update-bank'></Components.Popconfirm>
          ),
          key: '3-0',
          icon: '',
        },
        {
          title: (
            <Components.Popconfirm
              title={confirmPropsValue.title?.toString()}
              description={confirmPropsValue.description}
              okText={confirmPropsValue.okText}
              cancelText={confirmPropsValue.cancelText}
              type='primary'
              className='Scheduler-button'
              onConfirm={() =>
                confirmHandler('UPDATE_MILK_COLLECTION_IN_ERP', HTTP_METHOD.GET)
              }
              icon={<SyncOutlined />}
              buttontext='schedulers.updateMilkCollectionInErp'
              id='export-milk-collection'></Components.Popconfirm>
          ),
          key: '3-1',
          icon: '',
        },
      ],
    },
  ];
  return (
    <>
      <Components.Row>
        <Components.Col
          xl={12}
          md={12}
          sm={24}
          xs={24}
          xxl={12}>
          <Components.Tree
            treeData={LeftSideTreeData}
            defaultExpandAll
            showIcon></Components.Tree>
        </Components.Col>
        <Components.Col
          xl={12}
          md={12}
          sm={24}
          xs={24}
          xxl={12}>
          <Components.Tree
            treeData={RightSideTreeData}
            defaultExpandAll
            showIcon></Components.Tree>
        </Components.Col>
      </Components.Row>
    </>
  );
};

export default SchedulersTree;
