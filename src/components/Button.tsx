import { Button, ButtonProps } from 'antd';
import React from 'react';

export const ButtonComponent: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
