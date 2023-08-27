import React from 'react';
import Header from './components/Header/Header';
import AppContainer from './components/AppContainer/AppContainer';

import './App.css';


function App() {
  return (
    <div className="App">
      <AppContainer>
        <Header/>
      </AppContainer>
    </div>
  );
}


export default App;
