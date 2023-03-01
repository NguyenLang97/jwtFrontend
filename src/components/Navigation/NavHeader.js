import React, { useEffect, useState, useContext } from 'react';
import './NavHeader.scss';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg';
import { logoutUser } from '../../service/userService';
import { toast } from 'react-toastify';

const NavHeader = () => {
  const history = useHistory();
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();

  const hangleLogout = async () => {
    let data = await logoutUser();//clear cookie
    logoutContext();//clear local storage
    localStorage.removeItem('jwt');//clear user in context
    if (data && +data.EC === 0) {
      toast.success('Logout cuccess');

      history.push('/login');
    } else {
      toast.error(data.EM);
    }
  };

  if ((user && user.isAuthenticated === true) || location.pathname === '/') {
    return (
      <>
        <div className='nav-header'>
          <Navbar bg='header' expand='lg'>
            <Container>
              <Navbar.Brand href='#home'>
                <img
                  src={logo}
                  width='30'
                  height='30'
                  className='d-inline-block align-top'
                />
                <span className='brand-name'>React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                  <NavLink to='/' exact className='nav-link'>
                    Home
                  </NavLink>
                  <NavLink to='/users' className='nav-link'>
                    Users
                  </NavLink>
                  <NavLink to='/projects' className='nav-link'>
                    Projects
                  </NavLink>
                  <NavLink to='/about' className='nav-link'>
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className='nav-link'>
                        Wellcom {user.account.username}
                      </Nav.Item>
                      <NavDropdown title='Settings' id='basic-nav-dropdown'>
                        <NavDropdown.Item>Change password</NavDropdown.Item>
                        <NavDropdown.Item>
                          <span onClick={() => hangleLogout()}>Log out</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link to='/login' className='nav-link'>
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
