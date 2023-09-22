import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import ActionsMenu from './components/ActionsMenu/ActionsMenu';
import BoardsMenu from './components/BoardsMenu/BoardsMenu';
import NoteModal from './components/NoteModal/NoteModal';
import { boardsMenuOpenState } from './atoms/UIAtoms';
import { boardsState } from './atoms/DataAtoms';

import './App.css';
import DataPlaceholder from './components/DataPlaceholder/DataPlaceholder';
import MDNoteModal from './components/MDNoteModal/MDNoteModal';


const App = () => {
  const boards = useRecoilValue(boardsState);
  const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);

  return (
    <div className="App">
      <div className='desktop-art desktop-art-left'></div>
      <div className='desktop-art desktop-art-right'></div>

      <div className='app-container'>
        <MDNoteModal/>
        <motion.div
          className='animated-container'

          animate={
            isBoardsMenuOpen
            ? { marginLeft: "-380px", marginRight: "380px" }
            : { marginLeft: 0, marginRight: 0 }
          }
        >
          <Header/>
          { !!boards.length &&
            <>
              <Notes/>
              <ActionsMenu/>
            </>
          }
          { !!!boards.length && !isBoardsMenuOpen &&
            <DataPlaceholder type="boards"/>
          }
        </motion.div>

        <BoardsMenu/>
        <NoteModal/>
      </div>

    </div>
  );
}


export default App;