import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ControlBarSide from '../../components/ControlBar/ControlBarSide';
import ControlBarTop from '../../components/ControlBar/ControlBarTop';
import Dashboard from '../../components/Admin/Dashboard';
import Menu from '../../components/Admin/Menu';
// import Introduction from '../components/Admin/Introduction';
// import About from '../components/Admin/About';
// import Contact from '../components/Admin/Contact';
// import Projects from '../components/Admin/Projects';
// import Services from '../components/Admin/Services';
// import Project1 from '../components/Admin/Project1';
// import Project2 from '../components/Admin/Project2';
// import Project3 from '../components/Admin/Project3';

const AdminPage = ({ history, match }) => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  console.log(window.location.pathname);
  const opTitle = params.optitle;

  console.log(opTitle);

  const [urlInfoBox, setUrlInfoBox] = useState({});
  const [showSideCntrlBar, setShowSideCntrlBar] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const urlInfo = [
    { opTitle: 'dashboard', title: 'Dashboard', groupIndex: '0' },
    { opTitle: 'menu', title: 'Menu', groupIndex: '1' },

    // Orders ---
    { opTitle: 'about', title: 'About-Us', groupIndex: '2' },

    // users ---
    { opTitle: 'contact', title: 'Contact-Us', groupIndex: '3' },
    // { opTitle: 'useredit', title: 'User Edit', groupIndex: '3' },
    // { opTitle: 'userdetail', title: 'User Detail', groupIndex: '3' },

    // Product Utilities ---
    { opTitle: 'projects', title: 'Projects', groupIndex: '4' },
    { opTitle: 'project1', title: 'Project-Section-1', groupIndex: '4' },
    { opTitle: 'project2', title: 'Project-Section-2', groupIndex: '4' },
    { opTitle: 'project3', title: 'Project-Section-3', groupIndex: '4' },

    // Settings ---
    { opTitle: 'services', title: 'Services', groupIndex: '5' },
  ];

  // const opTitle = match.params.optitle;
  // console.log(history);
  // console.log(window.location);
  // console.log(opTitle);

  const query = window.location.search
    ? window.location.search.split('=')
    : null;

  console.log(query);

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'admin' || userInfo.userRole === 'systemAdmin')
    ) {
      if (opTitle) {
        const infoBox = urlInfo.find((info) => info.opTitle === opTitle);
        if (infoBox) {
          setUrlInfoBox(infoBox);
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      navigate('/login');
    }
  }, [history, userInfo, opTitle, navigate]);

  return (
    <main>
      <>
        {userInfo &&
        (userInfo.userRole === 'admin' ||
          userInfo.userRole === 'systemAdmin') &&
        opTitle &&
        urlInfoBox ? (
          <div className='main-content'>
            {/*--- Control Bar Top 1 ---*/}
            <ControlBarTop
              infoBox={{
                currentURL: window.location.pathname,
                groupIndex: urlInfoBox.groupIndex,
                adminName: userInfo.userName,
              }}
              showSideCntrlBar={showSideCntrlBar}
              setShowSideCntrlBar={setShowSideCntrlBar}
            />

            <Row className='m-0' style={{ minHeight: '100vh' }}>
              {/*--- Control Bar Side 1 ---*/}
              {showSideCntrlBar && (
                <Col
                  className='p-0 bg-black border-top border-end border-dark border-3'
                  style={{
                    minWidth: 'fit-content',
                    maxWidth: 'fit-content',
                    minHeight: '100%',
                    maxHeight: '100%',
                  }}
                >
                  <ControlBarSide
                    infoBox={{
                      currentURL: window.location.pathname,
                      groupIndex: urlInfoBox.groupIndex,
                      userInfo: userInfo,
                    }}
                  />
                </Col>
              )}

              <Col
                className='p-3'
                style={{
                  width: '50%',
                  maxWidth: '100%',
                  minHeight: '100%',
                  maxHeight: '100%',
                }}
              >
                {/*--- Control Bar Top 2 ---*/}
                <>
                  {/* <Row className='mt-4'>
                            <Col>
                                <ControlBarTop2
                                    infoBox={{
                                        opTitle: urlInfoBox.title,
                                        adminName: (userInfo.userName)
                                    }}
                                />
                            </Col>
                        </Row> */}
                </>

                {/*--- SECTION ---*/}
                {
                  // opTitle === 'dashboard' ? (
                  //     <AdminDashboard1 />
                  // ) :

                  // Inventory ---
                  opTitle === 'dashboard' ? (
                    <Dashboard history={history} />
                  ) : opTitle === 'menu' ? (
                    <Menu />
                  ) : opTitle === 'about' ? (
                    <Dashboard history={history} />
                  ) : opTitle === 'contact' ? (
                    <Dashboard history={history} />
                  ) : // Projects ---
                  opTitle === 'projects' ? (
                    <Dashboard history={history} />
                  ) : opTitle === 'project1' ? (
                    <Dashboard history={history} />
                  ) : opTitle === 'project2' ? (
                    <Dashboard history={history} />
                  ) : opTitle === 'project3' ? (
                    <Dashboard history={history} />
                  ) : opTitle === 'services' ? (
                    <Dashboard history={history} />
                  ) : (
                    <Dashboard history={history} />
                  )
                  // Mail Box ---
                  // (opTitle === 'inbox') ? <AdminAnalytics1 /> :
                  // (opTitle === 'viewmail') ? <AdminAnalytics1 /> :
                  // (opTitle === 'composemail') ? <AdminAnalytics1 /> :
                  // (opTitle === 'brandlist') ? <AdminDashboard1 /> :
                  // <AdminDashboard1 />
                }
              </Col>
            </Row>
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center main-content'>
            <h1 className='text-center text-light'>
              Upps! Something went wrong!
            </h1>
          </div>
        )}
      </>
    </main>
  );
};

export default AdminPage;
