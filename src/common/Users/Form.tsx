import React, { useEffect, useState } from 'react';
import Components from '../../components';
import {
  ClusterOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  LinkOutlined,
  LockOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createUser, fetchProvince, updateUser } from '../../services/User';
import { Form, message } from 'antd';
import { AddUser, UpdateUser } from '../../models/UserModel';
import { Countries, PAGE_TYPE, USER_TYPES } from './utils';
import { useTranslation } from 'react-i18next';

interface UserFormProps {
  pageType: string;
  isOpen: boolean;
  onCancel: () => void;
  user: UpdateUser;
  isEdit: boolean;
  getUsers: () => void;
}

export const UserForm: React.FC<UserFormProps> = (props) => {
  const [form] = Form.useForm<AddUser>();
  const [countries] =
    useState<Array<{ label: string; value: string }>>(Countries);
  const [provinces, setProvinces] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [isLoading, setIsLoding] = useState<boolean>(false);
  const [userTypes] = useState(USER_TYPES);
  const { t } = useTranslation();

  useEffect(() => {
    if (props.isOpen) {
      form.resetFields();
      fetchProvices();
      form.setFieldsValue(props.user);
    }
  }, [props.isOpen]);

  const fetchProvices = () => {
    fetchProvince().then(
      (response: { data: { body: { provinces: Array<string> } } }) => {
        setProvinces(
          response?.data?.body?.provinces.map((item: string) => {
            return {
              label: item,
              value: item,
            };
          })
        );
      }
    );
  };

  const onCreateUser = async () => {
    setIsLoding(true);
    try {
      await form.validateFields();
    } catch (error) {
      setIsLoding(false);
      return;
    }
    const formValues = form.getFieldsValue();
    if (props.pageType === PAGE_TYPE.CUSTOMER) {
      formValues.userType = 'CUSTOMER';
    }
    formValues.lastUpdatedAt = new Date().getTime();
    createUser(formValues)
      .then(
        (response: {
          data: { body: object; message: string; status: number };
        }) => {
          if (response?.data?.status === 200) {
            message.success(t('users.userCreatedSuccessMessage'));
            form.resetFields();
            props.onCancel();
          }
          setIsLoding(false);
        }
      )
      .catch((error) => {
        setIsLoding(false);
        console.error(error);
      });
  };

  const onUpdateUser = async () => {
    setIsLoding(true);
    try {
      await form.validateFields();
    } catch (error) {
      setIsLoding(false);
      return;
    }
    const toBeUpdate: UpdateUser = {
      ...form.getFieldsValue(),
      externalId: props.user.externalId,
    };
    updateUser(toBeUpdate)
      .then((response: { data: { body: { ok: number }; message: string } }) => {
        setIsLoding(false);
        props.onCancel();
        props.getUsers();
        message.success(response.data.message);
      })
      .catch((error) => {
        setIsLoding(false);
        console.error(error);
      });
  };

  return (
    <Components.Modal
      title={props.isEdit ? t('users.editUser') : t('users.addUser')}
      className='Add-User-Modal'
      open={props.isOpen}
      onCancel={props.onCancel}
      maskClosable={false}
      footer={[
        <Components.Button
          key={'cancel'}
          onClick={props.onCancel}>
          {t('users.cancel')}
        </Components.Button>,
        <Components.Popconfirm
          key={'submit'}
          title={t('users.submitConfirmationDesc')}
          buttontext={t('users.submit')}
          htmlType='submit'
          id='submit'
          onConfirm={props.isEdit ? onUpdateUser : onCreateUser}
          loading={isLoading}></Components.Popconfirm>,
      ]}>
      <Components.Form
        form={form}
        name='user-form'>
        {props.pageType === PAGE_TYPE.EXECUTIVE && (
          <Components.Row className='User-Form-Row'>
            <Components.Col span={24}>
              <Components.Title level={5}>{'User Type'}</Components.Title>
              <Components.FormItem
                name='userType'
                rules={[{ required: true, message: 'User type is required.' }]}>
                <Components.Select
                  showSearch={true}
                  suffixIcon={<UserOutlined />}
                  placeholder={'Select user type'}
                  size='middle'
                  options={userTypes}
                  data-testid='form-executive-type-list'
                  filterOption={(input, option: any) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Components.FormItem>
            </Components.Col>
          </Components.Row>
        )}
        {!props.isEdit && (
          <Components.Row className='User-Form-Row'>
            <Components.Col span={24}>
              <Components.Title level={5}>
                {t('users.userLoginId')}
              </Components.Title>
              <Components.FormItem
                name='userLoginId'
                rules={[
                  { required: true, message: t('users.userLoginIdIsRequired') },
                ]}>
                <Components.Input
                  prefix={<UserOutlined />}
                  placeholder={t('users.enterLoginId')}
                  size='middle'
                  name='userLoginId'
                />
              </Components.FormItem>
            </Components.Col>
          </Components.Row>
        )}
        <Components.Row
          gutter={[16, 16]}
          className='User-Form-Row'>
          <Components.Col span={12}>
            <Components.Title level={5}>{t('users.name')}</Components.Title>
            <Components.FormItem
              name='name'
              rules={[{ required: true, message: t('users.nameIsRequired') }]}>
              <Components.Input
                prefix={<SolutionOutlined />}
                placeholder={t('users.enterName')}
                size='middle'
                name='name'
              />
            </Components.FormItem>
          </Components.Col>
          <Components.Col span={12}>
            <Components.Title level={5}>{t('users.province')}</Components.Title>
            <Components.FormItem
              name='province'
              rules={[
                { required: true, message: t('users.provinceIsRequired') },
              ]}>
              <Components.Select
                showSearch={true}
                placeholder={t('users.selectProvince')}
                size='middle'
                options={provinces}
                suffixIcon={<EnvironmentOutlined />}
                data-testid='form-province-list'
                filterOption={(input, option: any) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </Components.FormItem>
          </Components.Col>
        </Components.Row>
        {!props.isEdit && (
          <Components.Row
            gutter={[16, 16]}
            className='User-Form-Row'>
            <Components.Col span={12}>
              <Components.Title level={5}>{'Password'}</Components.Title>
              <Components.FormItem
                name='password'
                rules={[
                  { required: true, message: t('users.passwordIsRequired') },
                ]}>
                <Components.Input
                  prefix={<LockOutlined />}
                  placeholder={t('users.enterPassword')}
                  size='middle'
                  name='password'
                />
              </Components.FormItem>
            </Components.Col>
            <Components.Col span={12}>
              <Components.Title level={5}>
                {t('users.externalId')}
              </Components.Title>
              <Components.FormItem
                name='externalId'
                rules={[
                  { required: true, message: t('users.externalIdIsRequired') },
                ]}>
                <Components.Input
                  placeholder={t('users.enterExteranlId')}
                  size='middle'
                  name='externalId'
                  prefix={<LinkOutlined />}
                />
              </Components.FormItem>
            </Components.Col>
          </Components.Row>
        )}
        {!props.isEdit && (
          <Components.Row
            gutter={[16, 16]}
            className='User-Form-Row'>
            <Components.Col span={12}>
              <Components.Title level={5}>
                {t('users.channel')}
              </Components.Title>
              <Components.FormItem
                name='channel'
                rules={[
                  { required: true, message: t('users.channleIsRequired') },
                ]}>
                <Components.Input
                  placeholder={t('users.enterChannel')}
                  size='middle'
                  name='channel'
                  prefix={<ClusterOutlined />}
                />
              </Components.FormItem>
            </Components.Col>
            <Components.Col span={12}>
              <Components.Title level={5}>
                {t('users.country')}
              </Components.Title>
              <Components.FormItem
                name='country'
                rules={[
                  { required: true, message: t('users.countryIsRequired') },
                ]}>
                <Components.Select
                  placeholder={t('users.selectCountry')}
                  showSearch={true}
                  options={countries}
                  suffixIcon={<GlobalOutlined />}
                  data-testid='form-country-list'
                  filterOption={(input, option: any) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Components.FormItem>
            </Components.Col>
          </Components.Row>
        )}
      </Components.Form>
    </Components.Modal>
  );
};
