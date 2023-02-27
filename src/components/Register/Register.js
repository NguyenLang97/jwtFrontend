import React, { useState } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../service/userService';

const Register = () => {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidInput = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      toast.error('Email is required');
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(email)) {
      toast.error('Please enter a valid email address');
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    if (!phone) {
      toast.error('Phone is required');
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });

      return false;
    }
    if (!password) {
      toast.error('Password is required');
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });

      return false;
    }
    if (password != confirmPassword) {
      toast.error('Password is not the same');
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });

      return false;
    }

    return true;
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleRegister = async () => {
    let check = isValidInput();

    if (check) {
      let response = await registerNewUser(email, phone, username, password);
      let serverData = response.data;
      if (Number(serverData.EC) === 0) {
        toast.success(serverData.EM);
        history.push('/login');
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  return (
    <div className='register-container'>
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
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input
                type='text'
                className={
                  objCheckInput.isValidEmail
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder='Email your'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone:</label>
              <input
                type='text'
                className={
                  objCheckInput.isValidPhone
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder='Phone your'
                id='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                className='form-control'
                placeholder='Username your'
                id='username'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                className={
                  objCheckInput.isValidPassword
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder='Password your'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='reenterpassword'>Re-enter Password:</label>
              <input
                type='password'
                className={
                  objCheckInput.isValidConfirmPassword
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder='Re-enter Password your'
                id='reenterpassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className='btn btn-primary'
              onClick={() => handleRegister()}
            >
              Register
            </button>

            <hr />
            <div className='text-center'>
              <button className='btn btn-success' onClick={() => handleLogin()}>
                Already've an account .Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
