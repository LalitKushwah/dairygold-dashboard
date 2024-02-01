import { Tree, TreeProps } from 'antd';
import React from 'react';
export const TreeComponent: React.FC<TreeProps> = (props) => {
	return <Tree {...props} />;
};
