import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { useEffect, useState, useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Rings, RotatingLines } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <div className='loading-container'>
            <Rings
              height='80'
              width='80'
              color='#1877f2'
              radius='6'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
              ariaLabel='rings-loading'
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>
        )}

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
      </Router>
    </>
  );
}

export default App;
