import { TextProps } from 'antd/es/typography/Text';
import { TitleProps } from 'antd/es/typography/Title';
import React from 'react';
import { Typography } from 'antd';

const { Text, Title } = Typography;

export const TextComponent: React.FC<TextProps> = (props) => {
  return <Text {...props} />;
};

export const TitleComponent: React.FC<TitleProps> = (props) => {
  return <Title {...props}>{props.children}</Title>;
};
