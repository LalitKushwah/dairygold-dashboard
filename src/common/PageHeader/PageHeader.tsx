import React, { ReactNode } from 'react';
import Components from '../../components';
import './PageHeader.css';

interface PageHeaderIProps {
  title: string;
  description?: string;
  primaryBtnText?: string;
  primartBtnAction?: () => void;
  primaryButtonIcon?: ReactNode;
  secondaryBtnText?: string;
  secondaryBtnAction?: () => void;
  secondaryButtonIcon?: ReactNode;
  tertiaryBtnText?: string;
  tertiaryBtnAction?: () => void;
  tertiaryButtonIcon?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderIProps> = ({
  title,
  description,
  primaryBtnText,
  primartBtnAction,
  primaryButtonIcon,
  secondaryBtnText,
  secondaryBtnAction,
  secondaryButtonIcon,
  tertiaryBtnText,
  tertiaryBtnAction,
  tertiaryButtonIcon,
}) => {
  return (
    <div className='PageHeader-Container'>
      <div className='PageHeader-TitleContainer'>
        <div>
          <Components.Title level={3}>{title}</Components.Title>
        </div>
        <div>
          <Components.Text>{description}</Components.Text>
        </div>
      </div>
      <div className='PageHeader-CTA'>
        {primaryBtnText ? (
          <Components.Button
            type='primary'
            icon={primaryButtonIcon}
            size={'large'}
            onClick={primartBtnAction}>
            {primaryBtnText}
          </Components.Button>
        ) : undefined}
        {secondaryBtnText ? (
          <Components.Button
            type='primary'
            icon={secondaryButtonIcon}
            size={'large'}
            onClick={secondaryBtnAction}>
            {secondaryBtnText}
          </Components.Button>
        ) : undefined}
        {tertiaryBtnText ? (
          <Components.Button
            type='primary'
            icon={tertiaryButtonIcon}
            size={'large'}
            onClick={tertiaryBtnAction}>
            {tertiaryBtnText}
          </Components.Button>
        ) : undefined}
      </div>
    </div>
  );
};
