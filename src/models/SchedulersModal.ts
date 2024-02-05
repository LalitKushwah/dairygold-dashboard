import { FormInstance } from 'antd';

export interface DeleteOrderFormValue {
  orderId: string;
}
export interface DeleteOrderFormProps {
  form: FormInstance<DeleteOrderFormValue>;
  onChange: () => void;
}

export type SchedulerModalProps = {
  isModalOpen: boolean;
  handleCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  form: FormInstance<DeleteOrderFormValue>;
  onChangeFormValue: () => void;
  isOrderIdNotEmpty: boolean;
};
