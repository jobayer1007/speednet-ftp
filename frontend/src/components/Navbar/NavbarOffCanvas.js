import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Offcanvas from 'react-bootstrap/Offcanvas';
import { LinkContainer } from 'react-router-bootstrap';
import menu from './menu.json';

const NavbarOffCanvas = () => {
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg='light' expand={expand} className='mb-3'>
          <Container fluid>
            {/* <LinkContainer to='/'>
              <Navbar.Brand>S4U</Navbar.Brand>
            </LinkContainer> */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Speed4You
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='text-center bg-light'>
                <Nav className='nav nav-fill'>
                  {menu &&
                    menu.map((menuItem, i) =>
                      menuItem.subMenu ? (
                        <NavDropdown
                          title={menuItem.name.toUpperCase()}
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                          key={i}
                        >
                          {menuItem.subMenu.map((subMenuItem, j) => (
                            <LinkContainer to={subMenuItem.url} key={j}>
                              <NavDropdown.Item className='bg-light'>
                                <button
                                  type='button'
                                  className='btn btn-sm btn-outline-primary'
                                >
                                  {subMenuItem.name.toUpperCase()}
                                </button>
                              </NavDropdown.Item>
                            </LinkContainer>
                          ))}
                        </NavDropdown>
                      ) : (
                        <LinkContainer to={menuItem.url} key={i}>
                          <Nav.Link>
                            <span className='btn btn-outline-primary rounded-pill'>
                              {menuItem.name.toUpperCase()}
                            </span>
                            {/* <button
                              type='button'
                              className='btn btn-sm btn-outline-primary'
                              // variant='transparent'
                            >
                              {menuItem.name.toUpperCase()}
                            </button> */}
                          </Nav.Link>
                        </LinkContainer>
                      )
                    )}

                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default NavbarOffCanvas;
