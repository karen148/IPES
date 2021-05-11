import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  requiredRoles,
  userRole,
  ...rest
}) => {
  const userHasRequiredRole = requiredRoles.includes(userRole);
  console.log(userHasRequiredRole);
  console.log(isAuthenticated);
  console.log(requiredRoles.includes(userRole));
  console.log(userRole);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated && userHasRequiredRole ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  requiredRoles: PropTypes.array.isRequired,
  userRole: PropTypes.string.isRequired,
};
