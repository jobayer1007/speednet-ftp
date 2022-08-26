import React, { useState, useEffect } from 'react';
import { Card, Navbar, Nav, Accordion, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

const StylesCBS1 = styled.div`
  position: sticky;
  top: 0;

  .card-body {
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: 0px 0px 1px #ccc;
  }

  .accordion {
    max-height: 100vh;
    overflow: auto;
  }
  .accordion .accordion-item {
    background-color: transparent;
  }
  .accordion .accordion-item .accordion-button {
    padding: 0.75rem 0.5rem;
    background-color: transparent;
    font-size: 1rem;
    font-weight: 500;
    color: #f1c75f;
    // color: #ffa41c;
  }
  .accordion-button::after {
    width: 0.9rem;
    height: 0.9rem;
    background-size: 0.9rem;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    transition: -webkit-transform 0.35s ease-in-out;
    transition: transform 0.35s ease-in-out;
    transition: transform 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
  }
  .accordion .accordion-item .accordion-body {
    padding: 0;
    font-size: 0.75rem;
  }
  .accordion .accordion-item .accordion-body .navbar .navbar-nav {
    margin-left: 1rem;
    font-family: monospace;
    font-size: 0.8rem;
    font-weight: normal;
    border-left: 1px solid #ffa41c;
  }

  .font-div-cbs1 {
    padding-left: 0.25rem;
    padding-right: 0.5rem;
    color: #ffa41c;
    width: 2rem;
    i {
      font-size: 1rem;
    }
  }
  .htitle-div-cbs1 {
    padding-right: 0.5rem;
  }
`;

const ControlBarSide = ({ infoBox }) => {
  const [hideHtitle, setHideHtitle] = useState(false);
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    setCurrentURL(infoBox.currentURL);
  }, [infoBox, infoBox.currentURL]);

  return (
    <StylesCBS1>
      <Card.Body className='bg-black px-2 pb-0 text-danger'>
        <div className='d-flex'>
          <Image
            src={infoBox.userInfo.image}
            width={40}
            height={40}
            roundedCircle={true}
            className='mt-1'
          />
          {!hideHtitle && (
            <div className='ps-2'>
              <small>{infoBox.userInfo.userName}</small>
              <br />
              <small className='text-uppercase'>
                {infoBox.userInfo.userRole}
              </small>
            </div>
          )}
        </div>
        <div
          variant='transparent'
          className={`btn w-100 px-2 py-0 text-danger ${
            hideHtitle ? 'text-start' : 'text-end'
          }`}
        >
          {hideHtitle ? (
            <i
              className='fas fa-long-arrow-alt-right'
              onClick={() => setHideHtitle(false)}
            ></i>
          ) : (
            <i
              className='fas fa-long-arrow-alt-left'
              onClick={() => setHideHtitle(true)}
            ></i>
          )}
        </div>
      </Card.Body>

      {infoBox.groupIndex !== '' && currentURL === infoBox.currentURL && (
        <Accordion defaultActiveKey={infoBox.groupIndex} className='fs-5'>
          {/* --- Dashbord - */}
          {/* <Accordion.Item eventKey='0'>
                        <Link to='/admin/dashboard'>
                            <Accordion.Header>
                                <div className='font-div-cbs1'>
                                    <i className='fas fa-tachometer-alt'></i>
                                </div>
                                {!hideHtitle &&
                                    <div className='htitle-div-cbs1'>
                                        Dashboard
                                    </div>
                                }
                            </Accordion.Header>
                        </Link>
                    </Accordion.Item> */}

          {/* --- Inventory - */}
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              <div className='font-div-cbs1'>
                <i className='fas fa-warehouse'></i>
              </div>
              {!hideHtitle && <div className='htitle-div-cbs1'>Menu</div>}
            </Accordion.Header>
            <Accordion.Body>
              <Navbar variant='dark'>
                <Nav
                  defaultActiveKey={infoBox.currentURL}
                  className='flex-column'
                >
                  <LinkContainer to='/admin/menu'>
                    <Nav.Link>Menu</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar>
            </Accordion.Body>
          </Accordion.Item>

          {/* --- Orders --- */}
          <Accordion.Item eventKey='2'>
            <Accordion.Header>
              <div className='font-div-cbs1'>
                <i className='fab fa-jedi-order'></i>
              </div>
              {!hideHtitle && <div className='htitle-div-cbs1'>About</div>}
            </Accordion.Header>
            <Accordion.Body>
              <Navbar variant='dark'>
                <Nav
                  defaultActiveKey={infoBox.currentURL}
                  className='flex-column'
                >
                  <LinkContainer to='/admin/about'>
                    <Nav.Link>About-Us</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar>
            </Accordion.Body>
          </Accordion.Item>

          {/* --- Users --- */}
          <Accordion.Item eventKey='3'>
            <Accordion.Header>
              <div className='font-div-cbs1'>
                <i className='fas fa-users-cog'></i>
              </div>
              {!hideHtitle && <div className='htitle-div-cbs1'>Contact</div>}
            </Accordion.Header>
            <Accordion.Body>
              <Navbar variant='dark'>
                <Nav
                  defaultActiveKey={infoBox.currentURL}
                  className='flex-column'
                >
                  <LinkContainer to='/admin/contact'>
                    <Nav.Link>Contact-Us</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar>
            </Accordion.Body>
          </Accordion.Item>

          {/* ------- Product Utilities --------- */}
          <Accordion.Item eventKey='4'>
            <Accordion.Header>
              <div className='font-div-cbs1'>
                <i className='fas fa-puzzle-piece'></i>
              </div>
              {!hideHtitle && <div className='htitle-div-cbs1'>Projects</div>}
            </Accordion.Header>
            <Accordion.Body>
              <Navbar variant='dark'>
                <Nav
                  defaultActiveKey={infoBox.currentURL}
                  className='flex-column'
                >
                  {/* <LinkContainer to='/admin/projects'>
                    <Nav.Link>Projects</Nav.Link>
                  </LinkContainer> */}
                  <LinkContainer to='/admin/projects1'>
                    <Nav.Link>Project-Section-1</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/admin/projects2'>
                    <Nav.Link>Project-Section-2</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/admin/projects3'>
                    <Nav.Link>Project-Section-3</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar>
            </Accordion.Body>
          </Accordion.Item>

          {/* ------- Settings --------- */}
          <Accordion.Item eventKey='5'>
            <Accordion.Header>
              <div className='font-div-cbs1'>
                <i className='fas fa-cog'></i>
              </div>
              {!hideHtitle && <div className='htitle-div-cbs1'>Services</div>}
            </Accordion.Header>
            <Accordion.Body>
              <Navbar variant='dark'>
                <Nav
                  defaultActiveKey={infoBox.currentURL}
                  className='flex-column'
                >
                  <LinkContainer to='/admin/services'>
                    <Nav.Link>Services</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar>
            </Accordion.Body>
          </Accordion.Item>

          {/* ------- Mail Box --------- */}
          {/* <Accordion.Item eventKey='3'>
                        <Accordion.Header>
                            <div className='font-div-cbs1'>
                                <i className='far fa-envelope'></i>
                            </div>
                            {!hideHtitle &&
                                <div className='htitle-div-cbs1'>
                                    Mail Box
                                </div>
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            <Navbar variant='dark' >
                                <Nav
                                    defaultActiveKey={infoBox.currentURL}
                                    className='flex-column'
                                >
                                    <LinkContainer to='/admin/inbox'><Nav.Link>Inbox</Nav.Link></LinkContainer>
                                    <LinkContainer to='/admin/viewmail'><Nav.Link>View Mail</Nav.Link></LinkContainer>
                                    <LinkContainer to='/admin/composemail'><Nav.Link>Compose Mail</Nav.Link></LinkContainer>
                                </Nav>
                            </Navbar>
                            <h1>Mail Box</h1>
                        </Accordion.Body>
                    </Accordion.Item> */}

          {/* ------- Form Elements --------- */}
          {/* <Accordion.Item eventKey='3'>
                        <Accordion.Header>
                            <div className='font-div-cbs1'>
                                <i className='fas fa-indent'></i>
                            </div>
                            {!hideHtitle &&
                                <div className='htitle-div-cbs1'>
                                    Form Elements
                                </div>
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            <h1>Form Elements</h1>
                        </Accordion.Body>
                    </Accordion.Item> */}

          {/* ------- Interface --------- */}
          {/* <Accordion.Item eventKey='2'>
                        <Accordion.Header>
                            <div className='font-div-cbs1'>
                                <i className='fas fa-puzzle-piece'></i>
                            </div>
                            {!hideHtitle &&
                                <div className='htitle-div-cbs1'>
                                    Interface
                                </div>
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            <h1>Interface</h1>
                        </Accordion.Body>
                    </Accordion.Item> */}

          {/* ------- Miscellaneous --------- */}
          {/* <Accordion.Item eventKey='3'>
                        <Accordion.Header>
                            <div className='font-div-cbs1'>
                                <i className='fas fa-chart-pie'></i>
                            </div>
                            {!hideHtitle &&
                                <div className='htitle-div-cbs1'>
                                    Miscellaneous
                                </div>
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            <h1>Miscellaneous</h1>
                        </Accordion.Body>
                    </Accordion.Item> */}

          {/* ------- Charts --------- */}
          {/* <Accordion.Item eventKey='4'>
                        <Accordion.Header>
                            <div className='font-div-cbs1'>
                                <i className='fas fa-chart-line'></i>
                            </div>
                            {!hideHtitle &&
                                <div className='htitle-div-cbs1'>
                                    Charts
                                </div>
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            <h1>Charts</h1>
                        </Accordion.Body>
                    </Accordion.Item> */}

          {/* ------- Data Tables --------- */}
          {/* <Accordion.Item eventKey='5'>
                        <Accordion.Header>
                            <div className='font-div-cbs1'>
                                <i className='fas fa-table'></i>
                            </div>
                            {!hideHtitle &&
                                <div className='htitle-div-cbs1'>
                                    Data Tables
                                </div>
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            <h1>Data Tables</h1>
                        </Accordion.Body>
                    </Accordion.Item> */}
        </Accordion>
      )}
    </StylesCBS1>
  );
};

export default ControlBarSide;
