import React from 'react';
import { Image, ImageProps } from 'antd';

export const ImageComponent: React.FC<ImageProps> = (props) => {
  return <Image {...props} />;
};
