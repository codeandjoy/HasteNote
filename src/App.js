import { motion } from 'framer-motion';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import Header from './components/Header/Header';
import NotesGrid from './components/Notes/NotesGrid';
import ActionsMenu from './components/ActionsMenu/ActionsMenu';
import BoardsMenu from './components/BoardsMenu/BoardsMenu';
import QuickNoteModal from './components/Notes/QuickNoteModal';
import MDNoteModal from './components/Notes/MDNoteModal';
import DataPlaceholder from './components/DataPlaceholder/DataPlaceholder';
import { boardsMenuOpenState, boardsMenuPageFadeActiveState, pageFadeCallbackState } from './atoms/UIAtoms';
import { useMediaQuery } from 'react-responsive';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';

import './App.css';
import { useSwipeable } from 'react-swipeable';


const App = () => {
  const boards = useLiveQuery(() => db.boards.toArray());
  const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" })

  const setBoardsMenuOpen = useSetRecoilState(boardsMenuOpenState);
  const setBoardMenuPageFadeActive = useSetRecoilState(boardsMenuPageFadeActiveState);
  const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);
  const swipe = useSwipeable({
    onSwipedLeft: (ed) => {
      setBoardsMenuOpen(true);
      setBoardMenuPageFadeActive(true);
      setPageFadeCallback(()=>()=>{
          setBoardsMenuOpen(false);
          setBoardMenuPageFadeActive(false);
      });
    }
  });

  return (
    <div className="App">
      <div className='desktop-art desktop-art-left'></div>
      <div className='desktop-art desktop-art-right'></div>

      <div className='app-container' { ...swipe }>
        <motion.div
          className='animated-container'

          animate={
            isBoardsMenuOpen
            ? { marginLeft: isSmallScreen?"-60vw":"-380px", marginRight: isSmallScreen?"60vw":"380px" }
            : { marginLeft: 0, marginRight: 0 }
          }
        >
          <Header/>
          { boards && !!boards.length &&
            <>
              <NotesGrid/>
              <ActionsMenu/>
            </>
          }
          { boards && !!!boards.length && !isBoardsMenuOpen &&
            <DataPlaceholder type="boards"/>
          }
        </motion.div>

        <BoardsMenu/>
        <QuickNoteModal/>
        <MDNoteModal/>
      </div>
    </div>
  );
}


export default App;