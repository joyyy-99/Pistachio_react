import React from 'react';
import chatbotFloatingIcon from '../assets/icons/chatbot-floating-icon.png';

const ChatbotToggle = ({ toggleChatbot }) => {
  return (
    <div
      id="chatbot-toggle"
      className="fixed bottom-6 right-6 z-50 bg-pistachio hover:bg-pistachio/90 p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300"
      onClick={toggleChatbot}
    >
      <img src={chatbotFloatingIcon} className="w-6 h-6" alt="Chatbot Icon"/>
    </div>
  );
};

export default ChatbotToggle;