import React, { ReactNode } from 'react';
import Components from '../../components';
import './PageHeader.css';
import CrudPermissionwithRBAC from '../Permission/CrudPermission';
import { CrudOperation } from '../../utils/common';

interface PageHeaderIProps {
  title: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnAction?: () => void;
  primaryButtonIcon?: ReactNode;
  secondaryBtnText?: string;
  secondaryBtnAction?: () => void;
  secondaryButtonIcon?: ReactNode;
  tertiaryBtnText?: string;
  tertiaryBtnAction?: () => void;
  tertiaryButtonIcon?: ReactNode;
  primaryBtnId?: string;
  secondaryBtnId?: string;
  tertiaryBtnId?: string;
  primaryButtonPermission?: string;
}

export const PageHeader: React.FC<PageHeaderIProps> = ({
  title,
  description,
  primaryBtnText,
  primaryBtnAction,
  primaryButtonIcon,
  primaryBtnId,
  secondaryBtnText,
  secondaryBtnAction,
  secondaryButtonIcon,
  secondaryBtnId,
  tertiaryBtnText,
  tertiaryBtnAction,
  tertiaryButtonIcon,
  tertiaryBtnId,
  primaryButtonPermission,
}) => {
  const PrimaryButtonWithRBAC = CrudPermissionwithRBAC(
    Components.Button,
    primaryButtonPermission || CrudOperation.CREATE
  );

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
          <PrimaryButtonWithRBAC
            type='primary'
            icon={primaryButtonIcon}
            size={'large'}
            onClick={primaryBtnAction}
            id={primaryBtnId}>
            {primaryBtnText}
          </PrimaryButtonWithRBAC>
        ) : undefined}
        {secondaryBtnText ? (
          <Components.Button
            type='primary'
            icon={secondaryButtonIcon}
            size={'large'}
            onClick={secondaryBtnAction}
            id={secondaryBtnId}>
            {secondaryBtnText}
          </Components.Button>
        ) : undefined}
        {tertiaryBtnText ? (
          <Components.Button
            type='primary'
            icon={tertiaryButtonIcon}
            size={'large'}
            onClick={tertiaryBtnAction}
            id={tertiaryBtnId}>
            {tertiaryBtnText}
          </Components.Button>
        ) : undefined}
      </div>
    </div>
  );
};
