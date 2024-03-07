import React, { useState } from 'react';
import {
  CrudOperation,
  CrudPermission,
  crudPermissions,
  getLoggedInUser,
} from '../../utils/common';

const CrudPermissionwithRBAC = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  permission: string
) => {
  const WithRBAC: React.FC<P> = (props) => {
    const userRole = getLoggedInUser()?.userType;
    const [isDisabled, setIsDisabled] = useState(true);
    if (
      userRole &&
      (crudPermissions[userRole as keyof CrudPermission]?.includes(
        CrudOperation.ALL
      ) ||
        crudPermissions[userRole as keyof CrudPermission]?.includes(
          permission
        )) &&
      isDisabled
    ) {
      setIsDisabled(false);
    }
    return (
      <WrappedComponent
        disabled={isDisabled}
        {...(props as P)}
      />
    );
  };

  return WithRBAC;
};
export default CrudPermissionwithRBAC;
