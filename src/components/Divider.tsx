import { Divider, DividerProps } from 'antd';
import React from 'react';

export const DividerComponent: React.FC<DividerProps> = (props) => {
  return <Divider {...props} />;
};
