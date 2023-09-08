import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import ActionsMenu from './components/ActionsMenu/ActionsMenu';
import BoardsMenu from './components/BoardsMenu/BoardsMenu';
import { useRecoilValue } from 'recoil';
import { boardsMenuOpen } from './atom';

import './App.css';
import PageFade from './components/PageFade/PageFade';

const dummyNotes = [
  {
    id: "1",
    title: "Lorem ipsum",
    tags: "#work #school",
    content: "Lorem ipsum dolor sit amet consectetur. At semper vel egestas lectus leo facilisi in feugiat nunc. Tempor id tempor viverra eget aliquet est. Quis vitae sapien elementum amet vel et proin. Nisi quis tellus non ac condimentum massa eu."
  },
  {
    id: "2",
    title: "Lorem ipsum",
    tags: "#work #school",
    content: "Lorem ipsum dolor sit amet consectetur. At semper vel egestas lectus leo facilisi in feugiat nunc. Tempor id tempor viverra eget aliquet est. Quis vitae sapien elementum amet vel et proin. Nisi quis tellus non ac condimentum massa eu."
  },
  {
    id: "3",
    title: "Lorem ipsum",
    tags: "#work #school",
    content: "Lorem ipsum dolor sit amet consectetur. At semper vel egestas lectus leo facilisi in feugiat nunc. Tempor id tempor viverra eget aliquet est. Quis vitae sapien elementum amet vel et proin. Nisi quis tellus non ac condimentum massa eu."
  },
  {
    id: "4",
    title: "Lorem ipsum",
    tags: "#work #school",
    content: "Lorem ipsum dolor sit amet consectetur. At semper vel egestas lectus leo facilisi in feugiat nunc. Tempor id tempor viverra eget aliquet est. Quis vitae sapien elementum amet vel et proin. Nisi quis tellus non ac condimentum massa eu."
  }
]


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
          <Notes notes={ dummyNotes }/>
          { !isBoardsMenuOpen &&
            <ActionsMenu/>
          }
        </motion.div>

        <BoardsMenu/>
      </div>
    </div>
  );
}


export default App;