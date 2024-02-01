import { Modal, ModalProps } from 'antd';
import React from 'react';
export const ModalComponent: React.FC<ModalProps> = (props) => {
	return <Modal {...props}></Modal>;
};
