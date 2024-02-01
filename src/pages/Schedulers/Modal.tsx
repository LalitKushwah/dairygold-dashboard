import { SchedulersDeleteOrderForm } from './Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Components from '../../components';
import { SchedulerModalProps } from '../../models/SchedulersModal';

export const SchedulersModal: React.FC<SchedulerModalProps> = ({
	isModalOpen,
	handleCancel,
	onConfirm,
	isLoading,
	isOrderIdNotEmpty,
	form,
	onChangeFormValue,
}) => {
	const { t } = useTranslation();
	return (
		<>
			<Components.Modal
				confirmLoading={true}
				title={t('schedulers.deleteOrderModalTitle')}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={[
					<Components.Button key={t('cancel')} onClick={handleCancel}>
						{t('schedulers.modalCancelText')}
					</Components.Button>,
					,
					<Components.Popconfirm
						key='confirm'
						title={t('schedulers.deleteOrderConfirmationText')}
						danger={true}
						disabled={!isOrderIdNotEmpty}
						buttontext={t('schedulers.modalOkText')}
						onConfirm={onConfirm}
						loading={isLoading}
						okText={t('schedulers.popconfirmOkText')}
						id='confirm-order'
						cancelText={t('schedulers.popconfirmCancelText')}></Components.Popconfirm>,
				]}>
				<SchedulersDeleteOrderForm form={form} onChange={onChangeFormValue}></SchedulersDeleteOrderForm>
			</Components.Modal>
		</>
	);
};
