import React from 'react';
import Components from '../../components';
import Logo from '../../assets/images/dairy_gold_logo.png';
import './Login.css';
import { useTranslation } from 'react-i18next';

const IMAGE_DIMENSIONS = 150;
const FIELDS_LABELS_SIZE = 5;

const LoginPage = () => {
  const { t } = useTranslation();
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
          <div>
            <Components.Title level={FIELDS_LABELS_SIZE}>
              {t('username')}
            </Components.Title>
            <Components.Input
              placeholder={t('usernamePlaceholder')}
              size='large'></Components.Input>
          </div>
          <div>
            <Components.Title level={FIELDS_LABELS_SIZE}>
              {t('password')}
            </Components.Title>
            <Components.Input
              placeholder={t('passwordPlaceholder')}
              size='large'></Components.Input>
          </div>
          <div className='Login-FieldsBtnContainer'>
            <Components.Button
              type='primary'
              block
              size='large'>
              {t('login')}
            </Components.Button>
          </div>
        </div>
      </Components.Card>
    </div>
  );
};

export default LoginPage;
