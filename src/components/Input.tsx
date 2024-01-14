import React from 'react';
import { Input, InputProps } from 'antd';

interface ExtendedInputProps extends InputProps {
  ispassword?: boolean;
}

export const InputComponent: React.FC<ExtendedInputProps> = (props) => {
  return props?.ispassword ? (
    <Input.Password {...props} />
  ) : (
    <Input {...props} />
  );
};
