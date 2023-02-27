<<<<<<< HEAD
import React from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='topnav'>
      <NavLink to='/' exact>
        Home
      </NavLink>
      <NavLink to='/news'>News</NavLink>
      <NavLink to='/contact'>Contact</NavLink>
      <NavLink to='/about'>About</NavLink>
    </div>
=======
import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';

const Nav = () => {
  const [isShow, setIsShow] = useState(true);
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === '/login') {
      setIsShow(false);
    }
  }, []);
  return (
    <>
      {isShow && (
        <div className='topnav'>
          <NavLink to='/' exact>
            Home
          </NavLink>
          <NavLink to='/users'>Users</NavLink>
          <NavLink to='/projects'>projects</NavLink>
          <NavLink to='/about'>About</NavLink>
        </div>
      )}
    </>
>>>>>>> master
  );
};

export default Nav;
