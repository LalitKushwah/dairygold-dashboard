import { Pagination, Table } from 'antd';
import React from 'react';

export const TableComponent: React.FC<any> = (props) => {
  const { paginationProps, ...rest } = props;
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 10 }}>
        <Pagination {...paginationProps}></Pagination>
      </div>
      <Table {...rest} />
    </>
  );
};
