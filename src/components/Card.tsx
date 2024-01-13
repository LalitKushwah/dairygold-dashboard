import React from 'react';
import { Card, CardProps } from 'antd';

export const CardComponent: React.FC<CardProps> = (props) => {
  return <Card {...props} />;
};
