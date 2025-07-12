import React, { useState, useRef, useEffect } from 'react';
import chatbotFloatingIcon from '../assets/icons/chatbot-floating-icon.png'; 

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSend = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');
    simulateBotResponse(text);
  };

  const simulateBotResponse = (userText) => {
    setIsTyping(true);
    setTimeout(() => {
      const reply = `Typing.....`;
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1500); 
  };

  const handleSuggestionClick = (text) => {
    handleSend(text);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
            id="chatbot-toggle"
            className="fixed bottom-6 right-6 z-50 bg-pistachio hover:bg-pistachio/90 p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300"
            onClick={handleToggle}
          >
        <img src={chatbotFloatingIcon} className="w-6 h-6" alt="Chatbot Icon"/>
      </button>

      {isOpen && (
        <div className="fixed right-6 top-20 bottom-24 w-100 bg-white dark:bg-navbar-dark rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-gray-600 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-pistachio text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src={chatbotFloatingIcon} className="w-8 h-8" alt="Bot Icon" />
              <div>
                <h3 className="font-semibold text-sm">Pistachio Assistant</h3>
                <p className="text-xs opacity-90">Ask me anything!</p>
              </div>
            </div>
            <button onClick={handleToggle} className="text-white text-xl font-bold">
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-navbar-dark" id="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 max-w-[85%] ${
                  msg.sender === 'user' ? 'justify-end ml-auto' : ''
                }`}
              >
                {msg.sender === 'bot' && (
                  <img
                    src={chatbotFloatingIcon}
                    className="w-6 h-6 mt-1 rounded-full"
                    alt="Bot"
                  />
                )}
                <div
                  className={`${
                    msg.sender === 'user'
                      ? 'bg-pistachio text-white'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                  } rounded-lg p-3 shadow-sm text-sm`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing / Loading */}
            {isTyping && (
              <div className="flex items-start space-x-2 bot-message">
                <img
                  src={chatbotFloatingIcon}
                  className="w-6 h-6 mt-1 rounded-full"
                  alt="Bot"
                />
                <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3 max-w-xs shadow-sm text-sm">
                  <span className="animate-pulse">Bot is typing...</span>
                </div>
              </div>
            )}
            <div ref={messageEndRef}></div>
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {['Most popular dish?', 'Vegetarian options?', 'Do you have dessert?'].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(prompt)}
                  className="bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-600 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask me anything about Pistachio..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-full bg-white dark:bg-gray-600 text-dark-font dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-pistachio focus:border-pistachio text-sm"
              />
              <button
                onClick={() => handleSend(input)}
                className="bg-pistachio hover:bg-pistachio/90 text-white p-2 rounded-full transition-colors"
              >
                {/* Send icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotUI;
