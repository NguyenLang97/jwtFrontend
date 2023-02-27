import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoutes = (props) => {
  let history = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (!session) {
      history.push('/login');
    }
  }, []);
  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRoutes;
