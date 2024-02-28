import { Layout } from 'antd';
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import './Users.css';
import NavBar from '../NavBar/NavBar';
import { PageHeader } from '../PageHeader/PageHeader';
import { UserFilter } from './Filters';
import UsersData from './Data';
import { UserForm } from './Form';
import { UpdateUser } from '../../models/UserModel';
import { CrudOperation, crudPermissions } from '../../utils/common';

interface UsersProps {
  pageTitle: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  activeKey: string;
  pageType: string;
  primaryBtnAction?: () => void;
  secondaryBtnAction?: () => void;
  primaryBtnId?: string;
  secondaryBtnId?: string;
  primaryBtnIcon?: ReactNode;
  secondaryBtnIcon?: ReactNode;
  isAddUser?: boolean;
  onCloseAddUserModal?: () => void;
}

export const Users: React.FC<UsersProps> = (props) => {
  const [searchByValue, setSearchByValue] = useState<string>();
  const [province, setProvince] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [user, setUser] = useState<UpdateUser>({} as UpdateUser);
  const onSearchByChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const debounceTimeout = setTimeout(() => {
      setSearchByValue(e.target.value);
    }, 2000);
    clearTimeout(debounceTimeout);
  };
  const [isAddUserModal, setIsAddUserModal] = useState<boolean>(false);

  const onProvinceFilterChangeHandler = (province: string) => {
    setProvince(province);
  };

  const onCloseAddUserModal = () => {
    setIsAddUserModal(false);
  };

  const primaryBtnAction = () => {
    setUser({} as UpdateUser);
    setIsEdit(false);
    setIsAddUserModal(true);
  };
  const childRef = useRef<any>();
  // Calling user data components method
  const getUsers = () => {
    if (childRef.current) {
      childRef.current.getUsers();
    }
  };

  return (
    <Layout className='User-Page-Container'>
      <NavBar activeKey={props.activeKey}></NavBar>
      <Layout>
        <PageHeader
          title={props.pageTitle}
          primaryBtnText={props.primaryBtnText}
          secondaryBtnText={props.secondaryBtnText}
          primaryBtnAction={primaryBtnAction}
          secondaryBtnAction={props.secondaryBtnAction}
          primaryButtonIcon={props.primaryBtnIcon}
          secondaryButtonIcon={props.secondaryBtnIcon}
          primaryBtnId={props.primaryBtnId}
          secondaryBtnId={props.secondaryBtnId}
          primaryButtonPermission={CrudOperation.CREATE}
        />
        <UserFilter
          onSearchByChangeHandler={onSearchByChangeHandler}
          onProvinceFilterChangeHandler={onProvinceFilterChangeHandler}
        />
        <UsersData
          ref={childRef}
          searchByValue={searchByValue}
          pageType={props.pageType}
          province={province}
          setIsAddUserModal={setIsAddUserModal}
          setIsEdit={setIsEdit}
          setUser={setUser}
        />
        <UserForm
          isOpen={isAddUserModal}
          onCancel={onCloseAddUserModal}
          pageType={props.pageType}
          isEdit={isEdit}
          user={user}
          getUsers={getUsers}></UserForm>
      </Layout>
    </Layout>
  );
};
