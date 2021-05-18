import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faShoppingBasket,
  faSignOutAlt,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../images/Logo.png';
import USER from '../images/avatar.jpg';
const Header = ({
  handleSignout,
  user,
  filterProducts,
  setActiveComponent,
  basketCount,
  userName,
  setBasketCount,
}) => {
  // console.log(user)
  // console.log(typeof basketCount, "------");
  
  // useEffect(() => { }, [user, setBasketCount]);
  // console.log(basketCount)
  return (
    <header className="header">
      <img src={Logo} alt="Safe Scales Logo" className="logo" />
      <div
        onClick={() => !user?setActiveComponent("default"):setActiveComponent('Login')}
      >
        <FontAwesomeIcon
          icon={faHome}
          size="2x"
          style={{ flex: 1,padding: '3px', color: 'grey' }}
        />
      </div>
      <form action="#" className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search reptiles"
          onChange={e => filterProducts(e.target.value)}
        />
        <button className="search__button">
          <FontAwesomeIcon
            icon={faSearch}
            size="2x"
            style={{ padding: '3px', color: 'grey' }}
          />
        </button>
      </form>
      <nav className="user-nav">
        <div
          onClick={() => setActiveComponent('Shop')}
          className="user-nav__basket"
        >
          <p className="user-nav__basket--count">{user && basketCount?typeof basketCount == 'object'? basketCount.length : basketCount:""}</p>
          <FontAwesomeIcon icon={faShoppingBasket} size="2x" />
          <span> Basket </span>
        </div>
        <div
          onClick={() => setActiveComponent('Profile')}
          className="user-nav__user user-nav__user--icon"
        >
          <img src={USER} alt="User" className="user-nav__user-photo" />
          <span className="user-nav__user-name">
            {user ? userName : 'GUEST'}
          </span>
        </div>
        {user && (
          <div onClick={handleSignout} className="user-nav__user">
            <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
            <span>SignOut</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
