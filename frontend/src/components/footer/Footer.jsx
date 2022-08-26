import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/blurays-logo-7.png';

const Footer = () => {
  return (
    <>
      <div className='footer' style={{ backgroundImage: `url(${bg})` }}>
        <div className='footer__content container'>
          <div className='footer__content__logo'>
            <div className='logo'>
              <Link to='/'>
                <img src={logo} alt='speed4you' />
              </Link>
            </div>
          </div>
          <div className='footer__content__menus'>
            <div className='footer__content__menu'>
              <Link to='/'>Home</Link>
              <Link to='/'>Contact us</Link>
              <Link to='/'>Term of services</Link>
              <Link to='/'>About us</Link>
            </div>
            <div className='footer__content__menu'>
              <Link to='/'>Live</Link>
              <Link to='/'>FAQ</Link>
              <Link to='/'>Premium</Link>
              <Link to='/'>Pravacy policy</Link>
            </div>
            <div className='footer__content__menu'>
              <Link to='/'>You must watch</Link>
              <Link to='/'>Recent release</Link>
              <Link to='/'>Top IMDB</Link>
            </div>
          </div>
        </div>
      </div>

      <footer className='main-footer'>
        <div className='footer-content container'>
          <p>
            Designed & Developed by{' '}
            <a
              href='https://find-jobayer.herokuapp.com/'
              target='_blank'
              rel='noreferrer'
            >
              J.
            </a>{' '}
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
          <div className='social'>
            <i className='fab fa-twitter'></i>
            <i className='fab fa-facebook'></i>
            <i className='fab fa-instagram'></i>
            <i className='fab fa-linkedin'></i>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
