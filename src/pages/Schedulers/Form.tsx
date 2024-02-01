import { FormInstance } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Components from '../../components';
import { DeleteOrderFormProps } from '../../models/SchedulersModal';

const FIELDS_LABELS_SIZE = 5;

export const SchedulersDeleteOrderForm: React.FC<DeleteOrderFormProps> = ({ form, onChange }) => {
	const { t } = useTranslation();
	return (
		<Components.Form form={form} name='delete-order' onValuesChange={onChange}   initialValues={{ remember: true }}>
			<Components.Title level={FIELDS_LABELS_SIZE}>{t('Order Id')}</Components.Title>
			<Components.FormItem validateTrigger = {'onBlur'} name='orderId' initialValue={''} validateFirst={true} rules={[{ required: true, message: t('schedulers.orderIdValidationText')}]}>
				<Components.Input  placeholder={t('schedulers.orderIdPlaceholder')} size='large' name='orderId' />
			</Components.FormItem>
		</Components.Form>
	);
};
