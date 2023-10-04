import React, { useState } from 'react';
import logo from './assests/logo.png';
import cross from './assests/cross.png';
import { fetchApi } from './Utlis/axios';
import Chat from './assests/chat.png';

const Chatbot = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const handleChatIconClick = () => {
    setShowChatbot(true);
  };

  const handleClose = () => {
    setShowChatbot(false);
  };

  const getQuestion = async () => {
    try {
      const result = await fetchApi.get(`match_question/?question=${inputText}`);
      if (result?.status === 200) {
        console.log("result data://", result?.data)
        const botResponse = result.data?.answer
          .replace(/\r\n/g, '<br>')
          .replace(/• /g, '<li>')
          .replace(/''/g, '<strong>');

        const newBotMessage = { text: botResponse, isUser: false };
        setBotMessages((prevMessages) => [...prevMessages, newBotMessage]);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = { text: "Please enter a valid question", isUser: false };
      setBotMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newUserMessage = { text: inputText, isUser: true };
    setUserMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText('');
    getQuestion();
  };

  const combinedMessages = [];

  for (let i = 0; i < userMessages.length; i++) {
    combinedMessages.push(userMessages[i]);
    if (i < botMessages.length) {
      combinedMessages.push(botMessages[i]);
    }
  }

  return (
    <>
      {!showChatbot ? (
        <img src={Chat} alt="chat_logo" onClick={handleChatIconClick} />
      ) : (
        <div className="chatbot-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <img src={logo} alt="logo" width="70%" />
            <img src={cross} alt="cross" style={{ marginLeft: '20px' }} onClick={handleClose} />
          </div>
          <div className="chatbot-dialog">
            {combinedMessages.map((message, index) => (
              <div
                key={`message-${index}`}
                className={`message ${message.isUser ? 'user' : 'bot'} ${index % 2 === 0 ? 'even' : 'odd'}`}
                dangerouslySetInnerHTML={{ __html: message.text }}
              ></div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
