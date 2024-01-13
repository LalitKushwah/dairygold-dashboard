import React from 'react';
import { Input, InputProps } from 'antd';

export const InputComponent: React.FC<InputProps> = (props) => {
  return <Input {...props} />;
};
