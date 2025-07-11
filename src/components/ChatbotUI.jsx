import React, { useState } from 'react'; 
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
        <button id="close-chatbot" onClick={toggleChatbot} className="text-white hover:text-gray-200 text-xl font-bold">
          &times; {/* This is the HTML entity for 'x' */}
        </button>
      </div>

      {/* Messages (this flex-1 area will scroll) */}
      <div id="chatbot-messages" className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example messages (you'd replace this with actual chat logic) */}
        {/* This is the bot's message structure from your HTML */}
        <div className="flex items-start space-x-2">
          <img src={chatbotFloatingIcon} className="w-6 h-6 mt-1" alt="Bot"/>
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3 max-w-xs">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              Hi there! How can I help you today?
            </p>
          </div>
        </div>
        {/* You could add your user's message here, if you had chat state */}
        {/*
        <div className="flex justify-end items-start">
          <div className="bg-pistachio text-white p-3 rounded-lg max-w-[75%]">
            Do you have a full menu?
          </div>
        </div>
        */}
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2">
          <button className="chatbot-suggestion bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300">
            Vegetarian options?
          </button>
          <button className="chatbot-suggestion bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300">
            Signature dishes?
          </button>
          <button className="chatbot-suggestion bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300">
            Opening hours?
          </button>
          <button className="chatbot-suggestion bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300">
            Spicy food?
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-600 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="chatbot-input"
            placeholder="Ask me anything about Pistachio..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-full bg-white dark:bg-gray-600 text-dark-font dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-pistachio focus:border-pistachio text-sm"
    
          />
          <button id="send-message" className="bg-pistachio hover:bg-pistachio/90 text-white p-2 rounded-full transition-colors">
            {/* SVG for send icon */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;