import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faOtter,
  faQuestionCircle,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setActiveComponent, hasAccount }) => {
  const [activeTab, setActiveTab] = useState(null);

  const setCurrentTab = (tab, component) => {
    setActiveTab(tab);
    setActiveComponent(component);
  };
  return (
    <nav className="sidebar">
      <ul className="side-nav">
        <li
          onClick={() => setCurrentTab(0, 'Login')}
          className={`side-nav__item side-nav__item${
            activeTab === 0 ? '--active' : ''
          }`}
        >
          <a href="#" className="side-nav__link">
            <FontAwesomeIcon
              icon={faUserCircle}
              size="2x"
              style={{ padding: '3px', color: 'inherit' }}
            />
            <span className="side-nav__text">SignUp</span>
          </a>
        </li>
        <li
          onClick={() => setCurrentTab(1, 'Products')}
          className={`side-nav__item side-nav__item${ activeTab === 1 ? '--active' : '' }`}
        >
          <a href="#" className="side-nav__link">
            <FontAwesomeIcon
              icon={faOtter}
              size="2x"
              style={{ padding: '3px', color: 'inherit' }}
            />
            <span className="side-nav__text">Reptiles</span>
          </a>
        </li>
        <li
          onClick={() => setCurrentTab(2, 'About')}
          className={`side-nav__item side-nav__item${
            activeTab === 2 ? '--active' : ''
          }`}
        >
          <a href="#" className="side-nav__link">
            <FontAwesomeIcon
              icon={faThumbsUp}
              size="2x"
              style={{ padding: '3px', color: 'inherit' }}
            />
            <span className="side-nav__text">About</span>
          </a>
        </li>
        <li
          onClick={() => setCurrentTab(3, 'Quiz')}
          className={`side-nav__item side-nav__item${
            activeTab === 3 ? '--active' : ''
          }`}
        >
          <a href="#" className="side-nav__link">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="2x"
              style={{ padding: '3px', color: 'inherit' }}
            />
            <span className="side-nav__text">Reptile Finder</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
