const backend_url = 'http://127.0.0.1:8000/chat';

// --- CHATBOT UI TOGGLE & CLOSE ---
const chatToggle = document.getElementById('chatbot-toggle');
const chatUI = document.getElementById('chatbot-ui');
const chatClose = document.getElementById('close-chatbot');
const chatbotInput = document.getElementById('chatbot-input');
const sendMessageButton = document.getElementById('send-message');
const chatbotMessages = document.getElementById('chatbot-messages');
const suggestionButtons = document.querySelectorAll('.chatbot-suggestion');

// Generate a unique session ID for the user
const sessionId = localStorage.getItem('chatbotSessionId') || `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
localStorage.setItem('chatbotSessionId', sessionId); // Store it for consistent sessions

// Event listener to toggle chatbot UI visibility
chatToggle.addEventListener('click', () => {
    chatUI.classList.toggle('hidden');
    if (!chatUI.classList.contains('hidden')) {
        chatbotInput.focus(); // Focus input when chat opens
        scrollToBottom(); // Scroll to bottom when opening
    }
});

// Event listener to close chatbot UI
chatClose.addEventListener('click', () => {
    chatUI.classList.add('hidden');
});

/**
 * Appends a message to the chatbot UI.
 * @param {string} sender - 'user' or 'bot'.
 * @param {string} text - The message text.
 */
function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('flex', 'items-start', 'space-x-2', 'max-w-[85%]'); // Limit message bubble width
    let senderIconHtml = '';
    let bubbleClasses = '';

    if (sender === 'user') {
        // User messages are aligned to the right
        messageDiv.classList.add('justify-end', 'ml-auto', 'user-message');
        // Tailwind class 'bg-pistachio' is used here
        bubbleClasses = 'bg-pistachio text-white rounded-lg p-3 shadow-md';
        // User icon
        senderIconHtml = `
            <img src="https://placehold.co/24x24/388E3C/FFFFFF?text=You" class="w-6 h-6 mt-1 rounded-full hidden" alt="User"/>
        `;
    } else { // sender === 'bot'
        // Bot messages are aligned to the left
        messageDiv.classList.add('bot-message');
        bubbleClasses = 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg p-3 shadow-sm';
        
        // Added onerror for robustness in case the image path is initially incorrect.
        senderIconHtml = `
            <img src="assets/icons/chatbot-floating-icon.png" onerror="this.onerror=null; this.src='https://placehold.co/24x24/90EE90/FFFFFF?text=B'" class="w-6 h-6 mt-1 rounded-full" alt="Bot"/>
        `;
    }

    messageDiv.innerHTML = `
        ${senderIconHtml}
        <div class="${bubbleClasses} message-bubble">
            <p class="text-sm break-words">${text}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom(); // Always scroll to bottom after adding a message
}

// Typing indicator element reference
let typingIndicatorDiv = null;

/**
 * Shows a typing indicator in the chatbot message area.
 */
function showTypingIndicator() {
    typingIndicatorDiv = document.createElement('div');
    typingIndicatorDiv.classList.add('flex', 'items-start', 'space-x-2', 'bot-message', 'typing-indicator');
    // Bot icon placeholder for typing indicator, using the same path as regular bot messages
    typingIndicatorDiv.innerHTML = `
        <img src="assets/icons/chatbot-floating-icon.png" onerror="this.onerror=null; this.src='https://placehold.co/24x24/90EE90/FFFFFF?text=B'" class="w-6 h-6 mt-1 rounded-full" alt="Bot"/>
        <div class="message-bubble bg-gray-100 dark:bg-gray-600 rounded-lg p-3 max-w-xs shadow-sm">
            <p class="text-sm text-gray-800 dark:text-gray-200 loading-dots"><span>.</span><span>.</span><span>.</span></p>
        </div>
    `;
    chatbotMessages.appendChild(typingIndicatorDiv);
    scrollToBottom();
}

/**
 * Removes the typing indicator from the chatbot message area.
 */
function removeTypingIndicator() {
    if (typingIndicatorDiv) {
        typingIndicatorDiv.remove();
        typingIndicatorDiv = null;
    }
}

/**
 * Scrolls the chatbot messages container to the bottom.
 */
function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

/**
 * Sends the user's message to the backend API and handles the response.
 */
async function sendMessage() {
    const userMessage = chatbotInput.value.trim();

    if (userMessage === '') {
        console.log("Empty message, not sending.");
        return;
    }

    appendMessage('user', userMessage);
    chatbotInput.value = '';

    showTypingIndicator();

    try {
        const response = await fetch(backend_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Send both message and session_id
            body: JSON.stringify({ message: userMessage, session_id: sessionId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        removeTypingIndicator();
        appendMessage('bot', data.answer); // Append bot's answer to UI
    } catch (error) {
        removeTypingIndicator();
        console.error('Error sending message to chatbot backend:', error);
        // Display a user-friendly error message
        if (error.message.includes("429")) {
            appendMessage('bot', 'The Pistachio Assistant is a bit busy right now. Please try again in a moment.');
        } else {
            appendMessage('bot', 'Oops! The Pistachio Assistant is having trouble right now. Please try again later.');
        }
    }
}

// --- Event Listeners for User Input ---
// Event listener for the send message button click
sendMessageButton.addEventListener('click', sendMessage);

// Event listener for 'Enter' key press in the input field
chatbotInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Event listeners for quick suggestion buttons
suggestionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Populate the input field with the suggestion text
        chatbotInput.value = button.textContent.trim();
        // Automatically send the message
        sendMessage();
    });
});

// Initial scroll to bottom when the script loads (in case chat is visible by default)
// Ensure this runs after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', scrollToBottom);
