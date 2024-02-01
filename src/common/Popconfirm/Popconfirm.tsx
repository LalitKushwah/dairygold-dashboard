import { ButtonProps, PopconfirmProps, Button } from 'antd';
import React from 'react';
import Components from '../../components';
type ExtendsProps = PopconfirmProps & ButtonProps & { buttontext: string };
export const PopconfirmComponent: React.FC<ExtendsProps> = (props) => {
	return (
		<Components.Popconfirm {...props}>
			<Button {...props}>{props.buttontext}</Button>
		</Components.Popconfirm>
	);
};
