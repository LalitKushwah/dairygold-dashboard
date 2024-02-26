import React from 'react';
import { DropDownProps, Dropdown } from 'antd';

export const DropdownComponent: React.FC<DropDownProps> = (props) => {
  return <Dropdown {...props} />;
};
