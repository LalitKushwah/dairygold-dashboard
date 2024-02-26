import React, { useEffect, useState } from 'react';
import { Form, Layout, message, PopconfirmProps, TreeDataNode } from 'antd';
import NavBar from '../../common/NavBar/NavBar';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import Components from '../../components';
import './Schedulers.css';
import SchedulersTree from './Tree';
import { SchedulersModal } from './Modal';
import { deleteOrder, triggerScheduler } from '../../services/Schedulers';
import { DeleteOrderFormValue } from '../../models/SchedulersModel';
import { useTranslation } from 'react-i18next';

const SchedulersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm<DeleteOrderFormValue>();
  const [isOrderIdNotEmpty, setIsOrderIdNotEmpty] = useState(false);
  const [isOrderLoading, setIsOderLoading] = useState(false);
  const { t } = useTranslation();

  const onChangeFormValue = async () => {
    if (form.getFieldValue('orderId')) {
      setIsOrderIdNotEmpty(true);
    } else {
      setIsOrderIdNotEmpty(false);
    }
  };

  const onTriggerScheduler = async (identifier: string, method: string) => {
    try {
      setIsLoading(true);
      const response = await triggerScheduler(identifier, method);
      if (response) {
        message.success(t('schedulers.successMsg'));
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onDeleteOrder = async () => {
    try {
      setIsOderLoading(true);
      const response = await deleteOrder(
        'DELETE_ORDER',
        form.getFieldValue('orderId')
      );
      if (response) {
        setIsModalOpen(false);
        setIsOderLoading(false);
        message.success(t('schedulers.orderDeleteSuccessMsg'));
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      setIsOderLoading(false);
    }
  };

  const showModal = async () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout className='SchedulersPage-Parent-Container'>
      <NavBar activeKey={'8'} />
      <Layout>
        <PageHeader title={t('schedulers.title')}></PageHeader>
        <Components.Card
          className='Schedulers-Container'
          loading={isLoading}>
          <SchedulersTree
            confirmHandler={onTriggerScheduler}
            showModal={showModal}
          />
        </Components.Card>
      </Layout>
      <SchedulersModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onConfirm={onDeleteOrder}
        isLoading={isOrderLoading}
        form={form}
        isOrderIdNotEmpty={isOrderIdNotEmpty}
        onChangeFormValue={onChangeFormValue}></SchedulersModal>
    </Layout>
  );
};

export default SchedulersPage;
