import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import PageRoutes from './config/PageRoutes';
import Header2 from './components/header2/Header2';
import MegaNavbar from './components/Navbar/MegaNavbar/MegaNavbar';

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <Header2 /> */}
      <MegaNavbar />
      <PageRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
