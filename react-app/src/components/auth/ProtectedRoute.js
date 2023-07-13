import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';

const ProtectedRoute = props => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user)? props.children  : history.push('/login')}
    </Route>
  )
};


export default ProtectedRoute;
