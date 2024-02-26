import React, {
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Components from '../../components';
import { CrudOperation, LIMIT } from '../../utils/common';
import { UserData } from '../../models/UserLoginModel';
import {
  deleteUser,
  getCustomersList,
  getSalesmansListWithPagination,
  resetPassword,
  updateUserStatus,
} from '../../services/User';
import './Users.css';
import { EditOutlined } from '@ant-design/icons';
import { Button, MenuProps, Spin, message } from 'antd';
import CrudPermissionwithRBAC from '../Permission/CrudPermission';
import { DashboardDataModal } from './DashboardModal';
import { UpdateUser } from '../../models/UserModel';
import { PAGE_TYPE, USER_STATUS } from './utils';
import { useTranslation } from 'react-i18next';

interface UserDataProps {
  searchByValue?: string;
  province?: string;
  pageType: string;
  setIsAddUserModal: (isOpen: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  setUser: (user: UpdateUser) => void;
  ref: MutableRefObject<ChildRef>;
}

interface ChildRef {
  getUsers: () => void;
}

const UsersData: React.ForwardRefRenderFunction<ChildRef, UserDataProps> = (
  props,
  ref
) => {
  const EditWithRBAC = CrudPermissionwithRBAC(
    Components.Text,
    CrudOperation.UPDATE
  );
  const DeleteWithRBAC = CrudPermissionwithRBAC(
    Components.Popconfirm,
    CrudOperation.DELETE
  );
  const ResetPassworWithRBAC = CrudPermissionwithRBAC(
    Components.Popconfirm,
    CrudOperation.UPDATE
  );
  const ActionDropdownWithRBAC = CrudPermissionwithRBAC(
    Components.Dropdown,
    CrudOperation.ALL
  );
  const StatusButtonWithRBAC = CrudPermissionwithRBAC(
    Components.Popconfirm,
    CrudOperation.UPDATE
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userList, setUsers] = useState<UserData[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<UserData>({} as UserData);
  const [isOpenDashboardModal, setIsOpenDashboardModal] =
    useState<boolean>(false);
  const { t } = useTranslation();

  const onEditUser = () => {
    const toBeUpdate: UpdateUser = {
      province: selectedUser.province,
      externalId: selectedUser.externalId,
      name: selectedUser.name,
    };
    if (selectedUser.userType !== PAGE_TYPE.CUSTOMER) {
      toBeUpdate.userType = selectedUser.userType;
    }
    props.setUser(toBeUpdate);
    setTimeout(() => {
      props.setIsEdit(true);
      props.setIsAddUserModal(true);
    }, 200);
  };
  let columns = [
    {
      title: t('users.userId'),
      dataIndex: 'externalId',
      key: 'externalId',
      render: (externalId: string) => (
        <Components.Text copyable>{externalId}</Components.Text>
      ),
    },
    {
      title: t('users.name'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Components.Text copyable>{name}</Components.Text>
      ),
    },
    {
      title: t('users.province'),
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: t('users.userType'),
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: t('users.userLoginId'),
      dataIndex: 'userLoginId',
      key: 'userLoginId',
    },
    {
      title: t('users.dashboard'),
      dataIndex: '',
      key: '',
      render: (text: string, record: UserData) => (
        <Button
        id='viewDashboard'
          onClick={() => {
            setSelectedUser(record);
            setIsOpenDashboardModal(true);
          }}>
          {t('users.view')}
        </Button>
      ),
    },
    {
      title: t('users.attendance'),
      dataIndex: 'attendanceAction',
      key: 'attendanceAction',
      render: () => <Components.Button>{t('users.view')}</Components.Button>,
    },
    {
      title: t('users.action'),
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: UserData) => (
        <ActionDropdownWithRBAC
          arrow={true}
          menu={{ items }}
          placement='topLeft'
          autoAdjustOverflow={true}>
          <Button
          id='actionBtn'
            onMouseEnter={() => {
              setSelectedUser(record);
            }}>
            <EditOutlined />
          </Button>
        </ActionDropdownWithRBAC>
      ),
    },
    {
      title: t('users.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: UserData) => (
        <StatusButtonWithRBAC
          placement='left'
          title={t('users.confirmation')}
          description={t('users.statusConfirmationDesc')}
          buttontext={status}
          okText={t('users.yes')}
          cancelText={t('users.no')}
          className={status}
          onConfirm={() => {
            onUpdateStatus(record);
          }}></StatusButtonWithRBAC>
      ),
    },
  ];
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <EditWithRBAC>{t('users.edit')}</EditWithRBAC>,
      onClick: () => {
        onEditUser();
      },
    },
    {
      key: '2',
      label: (
        <DeleteWithRBAC
          arrow={false}
          placement='left'
          key='confirm'
          className='Popconfirm-Button'
          title={t('users.confirmation')}
          description={`${t('deleteConfirmationDesc')} ${selectedUser.name}?`}
          buttontext={t('users.delete')}
          okText={t('users.yes')}
          cancelText={t('users.no')}
          onConfirm={() => {
            onDeleteUser();
          }}></DeleteWithRBAC>
      ),
      danger: true,
    },
    {
      key: '3',
      label: (
        <ResetPassworWithRBAC
          placement='left'
          key='confirm'
          className='Popconfirm-Button'
          title={t('users.confirmation')}
          description={`${t('users.resetPasswordDesc')} $${selectedUser.name}?`}
          buttontext={t('users.resetPassword')}
          okText={t('users.yes')}
          cancelText={t('users.no')}
          onConfirm={() => {
            onResetPassword();
          }}></ResetPassworWithRBAC>
      ),
    },
  ];

  if (props.pageType === PAGE_TYPE.CUSTOMER) {
    columns = columns.filter(
      (item) => item.title != 'Attendance' && item.title !== 'Status'
    );
  }

  const onUpdateStatus = async (user: UserData) => {
    try {
      setIsLoading(true);
      const updateStatus = {
        externalId: user.externalId,
        isActive: !user.isActive,
        userType: user.userType,
        userLoginId: user.userLoginId,
      };
      const response = await updateUserStatus(updateStatus);
      if (response?.data?.status === 200) {
        setIsLoading(false);
        getUsers();
        message.success(
          response?.data?.body?.message ||
            t('users.statusUpdatedSuccessMessage')
        );
      } else {
        setIsLoading(false);
        throw (
          response?.data?.body?.message ||
          t('users.statusUpdatedSuccessMessage')
        );
      }
    } catch (error) {
      setIsLoading(false);
      message.error(t('users.statusUpdatedSuccessMessage'));
    }
  };

  const handleDashboardModalCancel = () => {
    setIsOpenDashboardModal(false);
  };

  interface FetchUserQuery {
    search?: string;
    province?: string;
    skip: number;
    limit: number;
  }

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getUsers();
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [props.pageType, props.searchByValue, props.province]);

  const prepareQuery = (): FetchUserQuery => {
    const query: FetchUserQuery = {
      skip: skip,
      limit: LIMIT,
      requestType: 'dashboard',
    } as FetchUserQuery;
    if (props.searchByValue) {
      query.search = props.searchByValue;
    }
    if (props.province) {
      query.province = props.province;
    }
    return query;
  };

  const getUsers = async () => {
    setIsLoading(true);
    try {
      let response: {
        data: {
          body: [
            { data: UserData[]; totalCounts: number },
            { totalCounts: number }
          ];
        };
      } = {} as any;
      switch (props.pageType) {
        case PAGE_TYPE.CUSTOMER:
          response = await getCustomersList(prepareQuery());
          break;
        case PAGE_TYPE.EXECUTIVE:
          response = await getSalesmansListWithPagination(prepareQuery());
          break;
        default:
          break;
      }
      if (response?.data?.body[0]?.data?.length) {
        let users = response?.data?.body[0]?.data;
        users = users.map((item: UserData, index: number) => {
          return {
            ...item,
            key: index,
            status: item.isActive ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE,
          };
        });
        setTotalRecords(response.data?.body[0].totalCounts || 0);
        setUsers(users);
      } else {
        setUsers([]);
      }
      setIsLoading(false);
    } catch (ex) {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    getUsers,
  }));
  const onPageChangeHandler = (page: number, pageSize: number) => {
    if (page === 1) {
      setSkip(0);
    } else {
      setSkip((page - 1) * 10);
    }
  };

  const onResetPassword = async () => {
    try {
      setIsLoading(true);
      const response = await resetPassword(selectedUser._id);
      if (response?.data?.body?.ok === 1) {
        setIsLoading(false);
        message.success(
          response?.data?.body?.message ||
            t('users.passwordUpdatedSuccessMessage')
        );
      }
    } catch (error: any) {
      setIsLoading(false);
      message.error(
        error?.response?.data?.body?.message || 'Something went wrong'
      );
    }
  };

  const onDeleteUser = async () => {
    try {
      setIsLoading(true);
      const response = await deleteUser(selectedUser._id);
      if (response?.data?.body?.ok === 1) {
        setIsLoading(false);
        message.success(
          response?.data?.body?.message || t('users.userDeletedSuccessMessage')
        );
        getUsers();
      }
    } catch (error: any) {
      setIsLoading(false);
      message.error(
        error?.response?.data?.body?.message || t('users.somethingWentWrong')
      );
    }
  };

  return (
    <div className='Users-Data-Container'>
      <Components.Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={userList}
        loading={isLoading}
        pagination={false}
        rowClassName='User-Data-Row'
        paginationProps={{
          defaultCurrent: 1,
          total: totalRecords,
          onChange: onPageChangeHandler,
          showSizeChanger: false,
        }}
      />
      <DashboardDataModal
        title={selectedUser?.name}
        externalId={selectedUser.externalId}
        isOpen={isOpenDashboardModal}
        handleCancel={handleDashboardModalCancel}
        pageType={props.pageType}></DashboardDataModal>
    </div>
  );
};

export default React.forwardRef(UsersData);
