import './footer.css';

const Footer = (): JSX.Element => {
  const author = 'Veronika Yashchenkova';
  return (
    <footer className="footer">
      <a className="footer_link" href="https://github.com/aiyoy" target="_blank" rel="noreferrer">
        {author}
      </a>
    </footer>
  );
};

export default Footer;
