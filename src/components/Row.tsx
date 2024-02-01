import { Col, ColProps, Row, RowProps } from 'antd';
import React from 'react';

export const RowComponent: React.FC<RowProps> = (props) => {
	return <Row {...props} />;
};

export const ColComponent: React.FC<ColProps> = (props) => {
	return <Col {...props} />;
};
