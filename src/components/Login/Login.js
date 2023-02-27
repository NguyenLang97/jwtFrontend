import React, { useEffect } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';

const Login = () => {
  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push('/register');
  };
  
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
              className='form-control'
              placeholder='Email or phone number'
            />
            <input
              type='text'
              className='form-control'
              placeholder='Password'
            />
            <button className='btn btn-primary'>Login</button>
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
