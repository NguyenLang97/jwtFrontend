import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Nav = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  if ((user && user.isAuthenticated === true) || location.pathname === '/') {
    return (
      <>
        <div className='topnav'>
          <NavLink to='/' exact>
            Home
          </NavLink>
          <NavLink to='/users'>Users</NavLink>
          <NavLink to='/projects'>Projects</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Nav;
