import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        {/* <Nav /> */}
        <Switch>
          <Route path={'/news'}>news</Route>
          <Route path={'/about'}>about</Route>
          <Route path={'/contact'}>contact</Route>
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
      </div>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </BrowserRouter>
  );
}

export default App;
