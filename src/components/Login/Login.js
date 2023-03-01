import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../service/userService';

const Login = (props) => {
  let history = useHistory();

  const [valueLogin, setValueLogin] = useState('');
  const [password, setPassword] = useState('');

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidValuePassword: true
  };
  const [objValueInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleCreateNewAccount = () => {
    history.push('/register');
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error('Please enter your email address or phone number');
      return;
    }

    if (!password) {
      setObjValidInput({
        ...defaultObjValidInput,
        isValidValuePassword: false
      });
      toast.error('Please enter your password');
      return;
    }

    let response = await loginUser(valueLogin, password);

    if (response && response.data && Number(response.data.EC === 0)) {
      // success
      let data = {
        isAuthenticated: true,
        token: 'fake token'
      };
      sessionStorage.setItem('account', JSON.stringify(data));
      history.push('/users');
      window.location.reload();
    }
    if (response && response.data && Number(response.data.EC !== 0)) {
      // error
      toast.error(response.data.EM);
    }
  };

  const handlePressEnter = (e) => {
    if (e.charCode === 13 && e.code === 'Enter') {
      handleLogin();
    }
  };

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      history.push('/');
      window.location.reload();
    }
  }, []);

  return (
    <div className='login-container'>
      <div className='container'>
        <div className='row px-3 px-sm-0'>
          <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
            <div className='brand'>FACEBOOK</div>
            <div className='detail'>
              Hoi dan it The href attribute is used to specify the URL of the
              page that the link should go to. When a user clicks on the link,
              they will be taken to the specified URL.
            </div>
          </div>
          <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
            <div className='brand d-sm-none'>FACEBOOK</div>
            <input
              type='text'
              className={
                objValueInput.isValidValueLogin
                  ? 'form-control'
                  : 'form-control is-invalid'
              }
              placeholder='Email address or phone number'
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
            <input
              type='password'
              className={
                objValueInput.isValidValuePassword
                  ? 'form-control'
                  : 'form-control is-invalid'
              }
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handlePressEnter(e)}
            />
            <button className='btn btn-primary' onClick={() => handleLogin()}>
              Login
            </button>
            <span className='text-center'>
              <a href='/#' className='forgot-password'>
                Forgot your Password
              </a>
            </span>
            <hr />
            <div className='text-center'>
              <button
                className='btn btn-success'
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
