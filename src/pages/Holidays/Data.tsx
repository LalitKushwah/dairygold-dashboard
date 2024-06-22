import React from 'react';
import Components from '../../components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface IData {
  data: any;
  isLoading: boolean;
  totalRecords: number;
  onPageChangeHandler: any;
}

export const Data = ({
  data,
  isLoading,
  totalRecords,
  onPageChangeHandler,
}: IData) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (name: string) => <Components.Text>{name}</Components.Text>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (name: string) => <Components.Text>{name}</Components.Text>,
    },
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      render: (name: string) => <Components.Text>{name}</Components.Text>,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <div>
          <Components.Button
            icon={<EditOutlined />}
            style={{ marginRight: 10 }}>
            Edit
          </Components.Button>
          <Components.Button icon={<DeleteOutlined />}>
            Delete
          </Components.Button>
        </div>
      ),
    },
  ];

  return (
    <Components.Table
      columns={columns}
      rowKey={'_id'}
      loading={isLoading}
      dataSource={data || []}
      pagination={false}
      paginationProps={{
        defaultCurrent: 1,
        total: totalRecords,
        onChange: onPageChangeHandler,
        showSizeChanger: false,
      }}
    />
  );
};
