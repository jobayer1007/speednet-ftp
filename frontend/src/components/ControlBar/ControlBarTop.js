import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ControlBarTop = ({ showSideCntrlBar, setShowSideCntrlBar }) => {
  return (
    <Navbar
      variant='dark'
      expand='lg'
      className='px-3 py-0 fs-5 bg-dark navbarmod pt-0'
      collapseOnSelect
      // sticky='top'
    >
      {/* <Navbar.Text>
        <a href='#login'>Welcome {infoBox.adminName}</a>
      </Navbar.Text> */}
      <Button
        variant='transparent'
        className='btn-outline-light btn-sm my-2 py-0 border-danger'
        onClick={() => setShowSideCntrlBar(!showSideCntrlBar)}
      >
        {showSideCntrlBar ? 'Hide Sidebar' : 'Show Sidebar'}
      </Button>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav // justify // variant='tabs' // variant='pills'// style={{width: '100%'}} // className='justify-content-center'
          className='ms-auto'
          fill
        >
          {/* <LinkContainer to='/admin/dashboard'>
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer> */}

          {/* Inventory */}
          <NavDropdown title='Menu' align='end'>
            <LinkContainer to='/admin/menu'>
              <NavDropdown.Item>Menu</NavDropdown.Item>
            </LinkContainer>
            {/* <LinkContainer to='/admin/productlist'>
              <NavDropdown.Item>Product List</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/itemlist'>
              <NavDropdown.Item>Item List</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/productdetail'>
              <NavDropdown.Item>Product Detail</NavDropdown.Item>
            </LinkContainer> */}
          </NavDropdown>

          {/* Orders */}
          <NavDropdown title='About' align='end'>
            <LinkContainer to='/admin/about'>
              <NavDropdown.Item>About-Us</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          {/* Users */}
          <NavDropdown title='Contact' align='end'>
            <LinkContainer to='/admin/contact'>
              <NavDropdown.Item>Contact-Us</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          {/* Product Utilities */}
          <NavDropdown title='Projects' align='end'>
            <LinkContainer to='/admin/projects'>
              <NavDropdown.Item>Projects</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/project1'>
              <NavDropdown.Item>Project-Section-1</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/project2'>
              <NavDropdown.Item>Project-Section-2</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/project3'>
              <NavDropdown.Item>Project-Section-3</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          {/* Settings */}
          <NavDropdown title='Services' align='end'>
            <LinkContainer to='/admin/services'>
              <NavDropdown.Item>Services</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ControlBarTop;
