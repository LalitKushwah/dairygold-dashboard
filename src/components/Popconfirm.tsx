import { ButtonProps, PopconfirmProps, Button, Popconfirm } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
type ExtendsProps = PopconfirmProps & ButtonProps & { buttontext: string };
export const PopconfirmComponent: React.FC<ExtendsProps> = (props) => {
	const { t } = useTranslation();
	const buttonWidth = 80;
	return (
		<Popconfirm style={{ marginInlineStart: buttonWidth, whiteSpace: 'nowrap' }} {...props}>
			<Button
				type={props.type}
				icon={props.icon}
				danger={props.danger}
				loading={props.loading}
				style={{ textAlign: 'left' }}
				size={props.size}
				id={props.id}
				disabled={props.disabled}>
				{t(props.buttontext)}
			</Button>
		</Popconfirm>
	);
};
