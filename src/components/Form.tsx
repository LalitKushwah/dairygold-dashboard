import { Form, FormItemProps, FormProps } from 'antd';
import React from 'react';

// Extend FormProps to include the children prop
interface ExtendedFormProps extends FormProps {
  children: React.ReactNode;
}

export const FormComponent: React.FC<ExtendedFormProps> = (props) => {
  return <Form {...props}>{props.children}</Form>;
};

export const FormItemComponent: React.FC<FormItemProps> = (props) => {
  return <Form.Item {...props}>{props.children}</Form.Item>;
};
