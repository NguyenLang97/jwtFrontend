import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        {/* <Route path={'/projects'}>projects</Route>
        <Route path={'/users'}>
          <Users />
        </Route> */}
        <PrivateRoutes path='/users' component={Users} />
        <PrivateRoutes path='/projects' component={Users} />

        <Route path={'/login'}>
          <Login />
        </Route>
        <Route path={'/register'}>
          <Register />
        </Route>

        <Route path={'/'} exact>
          home
        </Route>
        <Route path={'*'}>404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
