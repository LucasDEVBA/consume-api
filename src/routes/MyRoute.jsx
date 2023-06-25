import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ element: Element, isClosed, ...rest }) {
  const isLogedIn = false;

  if (isClosed && !isLogedIn) {
    return (
      // <navigate
      //   to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      // />
      <Route>
        <Navigate replace to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }} />
      </Route>
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Route {...rest} element={<Element />} />
  );
}

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  isClosed: PropTypes.bool,
};
