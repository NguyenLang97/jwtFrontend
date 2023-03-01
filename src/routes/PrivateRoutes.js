import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);

  let history = useHistory();
  useEffect(() => {
    console.log('user', user);
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
