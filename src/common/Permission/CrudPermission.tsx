import React, { useEffect, useState } from 'react';
import { crudPermissions, getLoggedInUser } from '../../utils/common';

const CrudPermissionwithRBAC = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  permission: string
) => {
  const WithRBAC: React.FC<P> = (props) => {
    const userRole = getLoggedInUser().userType;
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
      const checkAccesss = async () => {
        if (
          userRole ||
          (crudPermissions[userRole] &&
            crudPermissions[userRole].includes(permission))
        ) {
          setIsDisabled(false);
        }
      };
      checkAccesss();
    }, [userRole, permission]);
    // Pass the hasPermission function as a prop to the wrapped component
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
