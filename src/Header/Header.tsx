import { useState } from 'react';

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
    <header className={navbar ? 'header active' : 'header'}>
      <div className="logo"></div>
    </header>
  );
};

export default Header;
