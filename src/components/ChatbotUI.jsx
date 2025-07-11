import React from 'react';
import chatbotFloatingIcon from '../assets/icons/chatbot-floating-icon.png';

const ChatbotUI = ({ isChatbotOpen, toggleChatbot }) => {
  return (
    <div
      id="chatbot-ui"
      className={`${isChatbotOpen ? 'block' : 'hidden'} fixed right-6 top-20 bottom-24 w-80 bg-white dark:bg-navbar-dark rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-gray-600 flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="bg-pistachio text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={chatbotFloatingIcon} className="w-8 h-8" alt="Bot Icon"/>
          <div>
            <h3 className="font-semibold text-sm">Pistachio Assistant</h3>
            <p className="text-xs opacity-90">Ask me anything!</p>
          </div>
        </div>
        <button id="close-chatbot" onClick={toggleChatbot} className="text-white hover:text-gray-200 text-xl font-bold">×</button>
      </div>

      {/* Messages (this flex-1 area will scroll) */}
      <div id="chatbot-messages" className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Chat messages would go here, dynamically rendered */}
        {/* Example messages (you'd replace this with actual chat logic) */}
        <div className="flex items-start">
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-lg max-w-[75%]">
            Hi there! How can I help you today?
          </div>
        </div>
        <div className="flex justify-end items-start">
          <div className="bg-pistachio text-white p-3 rounded-lg max-w-[75%]">
            Do you have a full menu?
          </div>
        </div>
        {/* ... more messages */}
      </div>

      {/* Input area (optional, for actual chat functionality) */}
      {/*
      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-dark-font dark:text-white focus:outline-none focus:ring-1 focus:ring-pistachio"
        />
        <button className="mt-2 w-full bg-pistachio hover:bg-pistachio/90 text-white py-2 rounded-md">Send</button>
      </div>
      */}
    </div>
  );
};

export default ChatbotUI;