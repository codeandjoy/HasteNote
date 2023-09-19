import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import ActionsMenu from './components/ActionsMenu/ActionsMenu';
import BoardsMenu from './components/BoardsMenu/BoardsMenu';
import PageFade from './components/PageFade/PageFade';
import NoteModal from './components/NoteModal/NoteModal';
import { boardsMenuOpenState } from './atoms/UIAtoms';
import { boardsState } from './atoms/DataAtoms';

import './App.css';
import DataPlaceholder from './components/DataPlaceholder/DataPlaceholder';


const App = () => {
  const boards = useRecoilValue(boardsState);
  const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);

  return (
    <div className="App">
      {/* desktop fade */}
      <PageFade/>

      <div className='app-container'>
        {/* app fade */}
        <PageFade/>
        
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
              { !isBoardsMenuOpen &&
                <ActionsMenu/>
              }
            </>
          }
          { !!!boards.length &&
            <DataPlaceholder
              type="boards"
            />
          }
        </motion.div>

        <BoardsMenu/>
        <NoteModal/>
      </div>

    </div>
  );
}


export default App;