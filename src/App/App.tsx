import { useState } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NoteContainer from '../NotesContainer/NotesConteiner';
import ModalWindow from '../ModalWindow/ModalWindow';
import NoteForm from '../NoteForm/NoteForm';
import SearchBar from '../SearchBar/SearchBar';

import { addNoteText, formType } from '../Constants/constants';

import './app.css';

const App = (): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <SearchBar />
        <NoteContainer />
        <div className="note-add" onClick={() => setModalOpen(true)}>
          {addNoteText}
        </div>
      </div>
      <Footer />
      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>{<NoteForm type={formType.add} />}</ModalWindow>
      )}
    </>
  );
};

export default App;
