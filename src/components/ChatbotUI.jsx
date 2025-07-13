import React, { useState, useEffect, useRef } from 'react';

const backend_url = import.meta.env.VITE_BACKEND_URL || 'https://pistachio-chatbot-app.onrender.com/chat';

const Chatbot = () => {
  // State for chatbot UI visibility
  const [isOpen, setIsOpen] = useState(false);
  // State for chat messages
  const [messages, setMessages] = useState([]);
  // State for input field value
  const [inputValue, setInputValue] = useState('');
  // State for typing indicator
  const [isTyping, setIsTyping] = useState(false);

  // Ref for scrolling to the bottom of messages
  const messagesEndRef = useRef(null);

  // Session ID for conversation memory
  const [sessionId, setSessionId] = useState(() => {
    const storedSessionId = localStorage.getItem('chatbotSessionId');
    if (storedSessionId) {
      return storedSessionId;
    }
    const newSessionId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('chatbotSessionId', newSessionId);
    return newSessionId;
  });

  // Scroll to bottom whenever messages change or component updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]); // Also scroll when chatbot opens

  // Initial bot message when component mounts
  useEffect(() => {
    setMessages([{ sender: 'bot', text: 'Hi there! How can I help you today?' }]);
  }, []);

  // Function to append a message to the chat
  const appendMessage = (sender, text) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  // Function to send message to backend
  const sendMessage = async () => {
    const userMessage = inputValue.trim();

    if (userMessage === '') {
      console.log("Empty message, not sending.");
      return;
    }

    appendMessage('user', userMessage);
    setInputValue(''); // Clear input field
    setIsTyping(true); // Show typing indicator

    try {
      const response = await fetch(backend_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, session_id: sessionId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      appendMessage('bot', data.answer);
    } catch (error) {
      console.error('Error sending message to chatbot backend:', error);
      if (error.message.includes("429")) {
        appendMessage('bot', 'The Pistachio Assistant is a bit busy right now. Please try again in a moment.');
      } else {
        appendMessage('bot', 'Oops! The Pistachio Assistant is having trouble right now. Please try again later.');
      }
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Handle suggestion button click
  const handleSuggestionClick = (text) => {
    setInputValue(text);
    sendMessage();
  };

  return (
    <>
      {/* CHATBOT TOGGLE BUTTON */}
      <div
        id="chatbot-toggle"
        className="fixed bottom-6 right-6 z-50 bg-pistachio hover:bg-pistachio/90 p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >

        <img src="src/assets/icons/chatbot-icon.png" className="w-6 h-6" alt="Chatbot Icon" />
      </div>

      {/* CHATBOT UI */}
      <div
        id="chatbot-ui"
        className={`fixed right-6 top-20 bottom-24 w-80 bg-white dark:bg-navbar-dark rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-gray-600 flex flex-col overflow-hidden ${isOpen ? '' : 'hidden'}`}
      >
        {/* Header */}
        <div className="bg-pistachio text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="src/assets/icons/chatbot-floating-icon.png" className="w-8 h-8" alt="Bot Icon" />
            <div>
              <h3 className="font-semibold text-sm">Pistachio Assistant</h3>
              <p className="text-xs opacity-90">Ask me anything!</p>
            </div>
          </div>
          <button id="close-chatbot" className="text-white hover:text-gray-200 text-xl font-bold" onClick={() => setIsOpen(false)}>&times;</button>
        </div>

        {/* Messages */}
        <div id="chatbot-messages" className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'justify-end ml-auto user-message' : 'bot-message'}`}>
              {msg.sender === 'bot' && (
                <img src="src/assets/icons/chatbot-floating-icon.png" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/24x24/90EE90/FFFFFF?text=B'; }} className="w-6 h-6 mt-1 rounded-full" alt="Bot" />
              )}
              <div className={`${msg.sender === 'user' ? 'bg-pistachio text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200'} rounded-lg p-3 shadow-md message-bubble`}>
                <p className="text-sm break-words">{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <img src="https://placehold.co/24x24/388E3C/FFFFFF?text=You" className="w-6 h-6 mt-1 rounded-full hidden" alt="User" />
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start space-x-2 bot-message typing-indicator">
              <img src="/assets/icons/chatbot-floating-icon.png" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/24x24/90EE90/FFFFFF?text=B'; }} className="w-6 h-6 mt-1 rounded-full" alt="Bot" />
              <div className="message-bubble bg-gray-100 dark:bg-gray-600 rounded-lg p-3 max-w-xs shadow-sm">
                <p className="text-sm text-gray-800 dark:text-gray-200 loading-dots"><span>.</span><span>.</span><span>.</span></p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            <button className="chatbot-suggestion bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300" onClick={() => handleSuggestionClick('Vegetarian options?')}>
              Vegetarian options?
            </button>
            <button className="chatbot-suggestion bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300" onClick={() => handleSuggestionClick('Signature dishes?')}>
              Signature dishes?
            </button>
            <button className="chatbot-suggestion bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300" onClick={() => handleSuggestionClick('Opening hours?')}>
              Opening hours?
            </button>
            <button className="chatbot-suggestion bg-gray-100 dark:bg-gray-600 hover:bg-pistachio/10 text-xs px-3 py-2 rounded-full text-dark-font dark:text-gray-300" onClick={() => handleSuggestionClick('Spicy food?')}>
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
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button id="send-message" className="bg-pistachio hover:bg-pistachio/90 text-white p-2 rounded-full transition-colors" onClick={sendMessage}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
