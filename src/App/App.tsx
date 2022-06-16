import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './app.css';

const App = (): JSX.Element => {
  const text = 'Hello world';

  return (
    <>
      <Header />
      <div className="toast-message">{text}</div>
      <Footer />
    </>
  );
};

export default App;
