import { NavLink } from 'react-router-dom';
import { Logo } from './icon-cmps/logo';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SideBar } from '../cmps/SideBar';

let profileClicked = false;

export const Header = (props) => {
  const { loggedInUser } = props;
  const location = useLocation();
  const [colorClass, setColorClass] = useState('');
  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    if (location.pathname !== '/') setColorClass('main-header-color');
  });

  const onScroll = () => {
    let scroll = document.documentElement.scrollTop;
    if (location.pathname === '/') {
      if (scroll > 20) {
        setColorClass('main-header-color');
      } else {
        setColorClass('');
      }
    }
  };

  const onProfileClicked = () => {
    profileClicked = !profileClicked;
  };


  return (
    <div
      className={`main-header flex justify-between align-center ${colorClass}`}
    >
      <NavLink to="/" className="logo-container">
        <Logo />
        <h1 className="logo">
          Match<span className="logo-decoration">A</span>pp
          <span className="logo-decoration">.</span>
        </h1>
      </NavLink>
      <SideBar />
      <div className="nav-links">
        <NavLink className="creat-event-header" to="/create">
          Create Event
        </NavLink>
        <NavLink className="explore-events-explore" to="/event">
          Explore
        </NavLink>
        <NavLink className="explore-events-explore" to="/myevents">
          Profile
        </NavLink>
        <NavLink className="explore-events-explore" to="/login">
          Login
        </NavLink>
        <div className="user-navs">
            <div className="profile-menu">
              <img src={loggedInUser.imgUrl} alt="" />{' '}
            </div>
        </div>
      </div>
    </div>
  );
};
