import { useState } from 'react';

import './header.css';

const Header = (): JSX.Element => {
  const [navbar, setNavbar] = useState<boolean>(false);

  const setActiveNavbar = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener('scroll', setActiveNavbar);

  return (
    <header className={navbar ? 'header header__active' : 'header'}>
      <div className="header_logo"></div>
    </header>
  );
};

export default Header;
