import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import Header from './components/Header/Header';
import NotesGrid from './components/Notes/NotesGrid';
import ActionsMenu from './components/ActionsMenu/ActionsMenu';
import BoardsMenu from './components/BoardsMenu/BoardsMenu';
import QuickNoteModal from './components/Notes/QuickNoteModal';
import MDNoteModal from './components/Notes/MDNoteModal';
import DataPlaceholder from './components/DataPlaceholder/DataPlaceholder';
import { boardsMenuOpenState } from './atoms/UIAtoms';
import { boardsState } from './atoms/DataAtoms';
import './App.css';


const App = () => {
  const boards = useRecoilValue(boardsState);
  const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);

  return (
    <div className="App">
      <div className='desktop-art desktop-art-left'></div>
      <div className='desktop-art desktop-art-right'></div>

      <div className='app-container'>
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
              <NotesGrid/>
              <ActionsMenu/>
            </>
          }
          { !!!boards.length && !isBoardsMenuOpen &&
            <DataPlaceholder type="boards"/>
          }
        </motion.div>

        <BoardsMenu/>
        <QuickNoteModal/>
        {/* <MDNoteModal/> */}
      </div>
    </div>
  );
}


export default App;