import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NoteContainer from '../NotesContainer/NotesConteiner';

import { addNoteText } from '../Constants/constants';

import './app.css';

const App = (): JSX.Element => {
  const text = 'Hello world';

  return (
    <>
      <Header />
      <NoteContainer />
      <div className="note-add">{addNoteText}</div>
      <Footer />
    </>
  );
};

export default App;
