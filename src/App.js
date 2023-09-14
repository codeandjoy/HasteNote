import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import ActionsMenu from './components/ActionsMenu/ActionsMenu';
import BoardsMenu from './components/BoardsMenu/BoardsMenu';
import PageFade from './components/PageFade/PageFade';
import NoteModal from './components/NoteModal/NoteModal';
import { useRecoilValue } from 'recoil';
import { boardsMenuOpen } from './atoms/UIAtoms';

import './App.css';


const App = () => {

  const isBoardsMenuOpen = useRecoilValue(boardsMenuOpen);

  return (
    <div className="App">
      {/* desktop fade */}
      <PageFade/>

      <div className='app-container'>
        {/* app fade */}
        {/* <PageFade isActive={ boardsMenuOpen || actionsMenuOpen }/> */}
        <PageFade/>
        <motion.div
          className='animated-container'

          animate={
            isBoardsMenuOpen ?
            {marginLeft: "-380px", marginRight: "380px"}
            :
            {marginLeft: 0, marginRight: 0}
          }
        >
          <Header/>
          <Notes/>
          { !isBoardsMenuOpen &&
            <ActionsMenu/>
          }
        </motion.div>

        <BoardsMenu/>
        <NoteModal/>
      </div>

    </div>
  );
}


export default App;