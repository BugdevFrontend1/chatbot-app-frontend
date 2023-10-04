import React, { useState } from 'react';
import './App.css';
import Chatbot from './Chatbot';
import Header from './Header';

function App() {
 
  return (
    <>
      <div className="App">
        <Header />
        <div className="content-container">
          <div className="chat-icon-container">
              <Chatbot />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
