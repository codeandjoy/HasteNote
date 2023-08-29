import React from 'react';
import Header from './components/Header/Header';
import AppContainer from './components/AppContainer/AppContainer';
import Notes from './components/Notes/Notes';

import './App.css';

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


function App() {
  return (
    <div className="App">
      <AppContainer>
        <Header/>
        <Notes notes={ dummyNotes }/>
      </AppContainer>
    </div>
  );
}


export default App;