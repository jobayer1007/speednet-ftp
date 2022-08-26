import React from 'react';
import { Card } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

const Menu = () => {
  return (
    <main>
      <div className='d-flex align-items-center justify-content-center main-content'>
        <ToastContainer />
        {/* <h1 className='text-center text-light'>Welcom To the Dashbord!</h1> */}
        <Card border='info'>
          <Card.Header className='text-center text-light' as='h2'>
            Welcom To the Menu-setting-page
          </Card.Header>
          <Card.Body>Welcom To the Menu-setting-page</Card.Body>
        </Card>
      </div>
    </main>
  );
};

export default Menu;
