import React, { useState } from 'react';
import Components from '../../components';
import { FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import { authenticate } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { UserLoginModel } from '../../models/UserLoginModel';

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginFormIProps {
  form: FormInstance<LoginFormValues>;
  onChange: () => void;
  isValuePresent: boolean;
}
const FIELDS_LABELS_SIZE = 5;

export const LoginForm: React.FC<LoginFormIProps> = ({
  form,
  onChange,
  isValuePresent,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoding] = useState<boolean>(false);

  const onLogin = async () => {
    setIsLoding(true);
    try {
      await form.validateFields();
    } catch (ex) {
      console.error(ex);
    }
    const { username, password } = form.getFieldsValue();
    try {
      const response: UserLoginModel = await authenticate(username, password);
      const token = response.body[0].token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
      setIsLoding(false);
    } catch (ex) {
      console.error(ex);
      setIsLoding(false);
    }
  };

  return (
    <Components.Form
      form={form}
      name='login-form'
      onValuesChange={onChange}>
      <div>
        <Components.Title level={FIELDS_LABELS_SIZE}>
          {t('username')}
        </Components.Title>
        <Components.FormItem
          name='username'
          required>
          <Components.Input
            placeholder={t('usernamePlaceholder')}
            size='large'
            name='username'
          />
        </Components.FormItem>
      </div>
      <div>
        <Components.Title level={FIELDS_LABELS_SIZE}>
          {t('password')}
        </Components.Title>
        <Components.FormItem
          name='password'
          required>
          <Components.Input
            ispassword={true}
            placeholder={t('passwordPlaceholder')}
            size='large'
            name='password'
          />
        </Components.FormItem>
      </div>
      <div className='Login-FieldsBtnContainer'>
        <Components.Button
          type='primary'
          block
          size='large'
          disabled={!isValuePresent}
          onClick={onLogin}
          loading={isLoading}
          id='login-btn'>
          {t('login')}
        </Components.Button>
      </div>
    </Components.Form>
  );
};
