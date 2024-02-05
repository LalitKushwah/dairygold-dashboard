import { SelectProps, Select } from 'antd';
import React from 'react';

export const SelectComponent: React.FC<SelectProps> = (props) => {
  return <Select {...props} />;
};
