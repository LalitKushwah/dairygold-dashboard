import React, { useState, useEffect } from 'react';
import Components from '../../components';
import Logo from '../../assets/images/dairy_gold_logo.png';
import './Login.css';
import { useTranslation } from 'react-i18next';
import { Form, FormInstance } from 'antd';
import { LoginForm } from './Form';

const IMAGE_DIMENSIONS = 150;

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<LoginFormValues>();
  const [isValuePresent, setIsValuePresent] = useState<boolean>(false);

  // Function to check if both username and password fields are filled
  const onValuesChange = () => {
    const values = form.getFieldsValue();
    const valuePresent = values?.username && values?.password ? true : false;
    setIsValuePresent(valuePresent);
  };

  return (
    <div className='Login-Container'>
      <Components.Card
        className='Login-Card'
        hoverable
        bordered>
        <div className='Login-FieldsContainer'>
          <div className='Login-FieldsImageContainer'>
            <Components.Image
              src={Logo}
              width={IMAGE_DIMENSIONS}
              height={IMAGE_DIMENSIONS}
              preview={false}
            />
          </div>
          <LoginForm
            form={form}
            onChange={onValuesChange}
            isValuePresent={isValuePresent}
          />
        </div>
      </Components.Card>
    </div>
  );
};

export default LoginPage;
