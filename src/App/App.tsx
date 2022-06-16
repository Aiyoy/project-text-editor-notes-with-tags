import Header from '../Header/Header';

const App = (): JSX.Element => {
  const text = 'Hello world';

  return (
    <>
      <Header />
      <div className="toast-message">{text}</div>
    </>
  );
};

export default App;
