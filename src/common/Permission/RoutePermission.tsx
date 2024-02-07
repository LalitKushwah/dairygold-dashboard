// withRBAC.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/common';

const RoutePermissionwithRBAC =
  (allowedRoles: string[]) =>
  <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const RBACComponent: React.FC<P> = (props) => {
      const userRole = getLoggedInUser()?.userType;
      const navigate = useNavigate();

      if (!userRole || !allowedRoles.includes(userRole)) {
        navigate('/home');
        return null;
      } else {
        return <WrappedComponent {...(props as P)} />;
      }
    };
    return RBACComponent;
  };

export default RoutePermissionwithRBAC;
