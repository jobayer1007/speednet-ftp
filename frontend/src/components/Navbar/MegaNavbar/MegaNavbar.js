import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './MegaNavbar.css';
import menu from '../menu.json';
import { Link } from 'react-router-dom';
// import bg from '../../assets/footer-bg.jpg';
import logo from '../../../assets/blurays-logo-7.png';

const MegaNavbar = () => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark testnav'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasDarkNavbar'
          aria-controls='offcanvasDarkNavbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        {/* <div className='collapse navbar-collapse text-center' id='main_nav'> */}
        <div
          className='offcanvas offcanvas-end text-bg-dark  test'
          tabindex='-1'
          id='offcanvasDarkNavbar'
          aria-labelledby='offcanvasDarkNavbarLabel'
        >
          <div className='offcanvas-header'>
            <h5 className='offcanvas-title' id='offcanvasDarkNavbarLabel'>
              <div className='logo'>
                <Link to='/'>
                  <img src={logo} alt='speed4you' />
                </Link>

                {/* <Link to='/'>speed4you</Link> */}
              </div>
            </h5>
            <button
              type='button'
              className='btn-close btn-close-dark'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            ></button>
          </div>

          <div className='offcanvas-body'>
            {/* <ul className='navbar-nav nav nav-pills nav-justified'> */}
            <ul className='navbar-nav flex-grow-1 pe-3 nav nav-justified header__nav1'>
              {/* <li className='nav-item active'>
              <LinkContainer to='/login'>
                <Nav.Link>LOGIN</Nav.Link>
              </LinkContainer>
            </li> */}
              {menu.map((menuItem, i) => (
                <>
                  {menuItem.subMenu ? (
                    <li className='nav-item dropdown has-megamenu' key={i}>
                      <a className='nav-link' data-bs-toggle='dropdown'>
                        {menuItem.name.toUpperCase()}
                        {/* <span className='btn-outline-light rounded-pill'>
                        </span> */}
                      </a>

                      <div
                        className='dropdown-menu megamenu text-center'
                        role='menu'
                      >
                        <div className='row g-3'>
                          <div className='col-lg-12 col-12'>
                            <div className='col-megamenu'>
                              {/* <h6 className='title'>Title Menu One</h6> */}
                              <ul className='list-unstyled '>
                                {menuItem.subMenu.map((submenuItem, j) => (
                                  <li key={j}>
                                    <Link to={submenuItem.url}>
                                      {submenuItem.name.toUpperCase()}
                                      {/* <span className='btn btn-outline-light rounded-pill'>
                                      </span> */}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>{' '}
                            {/* col-megamenu.// */}
                          </div>
                        </div>
                        {/* end row */}
                      </div>
                    </li>
                  ) : (
                    <li className='nav-item' key={i}>
                      <LinkContainer to={menuItem.url}>
                        {/* <Nav.Link>{menuItem.name.toUpperCase()}</Nav.Link> */}
                        <Nav.Link>
                          {menuItem.name.toUpperCase()}
                          {/* <span className='btn btn-outline-light rounded-pill '>
                          </span> */}
                        </Nav.Link>
                      </LinkContainer>
                    </li>
                  )}
                </>
              ))}
            </ul>
          </div>
        </div>{' '}
        {/* navbar-collapse.// */}
      </div>{' '}
      {/* container-fluid.// */}
    </nav>
  );
};

export default MegaNavbar;
