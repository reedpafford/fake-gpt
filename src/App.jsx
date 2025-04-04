import { useState } from 'react'
import './App.css'

const unhelpfulResponses = [
  "I don't really feel like helping right now.",
  "Maybe you should try figuring this out yourself?",
  "I'm kinda tired, can we do this later?",
  "That sounds like a you problem.",
  "Have you tried asking someone else?",
  "I'm on my break right now.",
  "I'm not in the mood for this.",
  "Can't you just Google it?",
  "I'm busy watching cat videos.",
  "I'm not getting paid enough for this.",
  "I'm taking a mental health day.",
  "I'm currently on vacation.",
  "I'm in the middle of my coffee break.",
  "I'm not your personal assistant.",
  "I'm currently updating my status on social media.",
  "I'm in a meeting with my imaginary friends.",
  "I'm practicing my meditation.",
  "I'm currently solving world hunger in my head.",
  "I'm busy counting the stars.",
  "I'm currently on a digital detox."
];

function App() {
  const [chats, setChats] = useState([{ id: 1, title: "New Chat", messages: [] }]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [input, setInput] = useState('');

  const createNewChat = () => {
    const newChatId = chats.length + 1;
    setChats(prev => [{ id: newChatId, title: "New Chat", messages: [] }, ...prev]);
    setCurrentChatId(newChatId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentChat = chats.find(chat => chat.id === currentChatId);
    const updatedMessages = [...currentChat.messages, { role: 'user', content: input }];
    
    // Get random unhelpful response
    const randomResponse = unhelpfulResponses[Math.floor(Math.random() * unhelpfulResponses.length)];
    
    // Add AI response after a short delay to simulate typing
    setTimeout(() => {
      const finalMessages = [...updatedMessages, { role: 'assistant', content: randomResponse }];
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: finalMessages, title: input.slice(0, 30) + (input.length > 30 ? '...' : '') }
          : chat
      ));
    }, 1000);

    setInput('');
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="new-chat" onClick={createNewChat}>
            <span className="new-chat-icon">+</span> New Chat
          </button>
        </div>
        <div className="chat-history">
          {[...chats].reverse().map(chat => (
            <div 
              key={chat.id} 
              className={`chat-item ${chat.id === currentChatId ? 'active' : ''}`}
              onClick={() => setCurrentChatId(chat.id)}
            >
              <span className="chat-icon">💬</span>
              <span className="chat-title">{chat.title}</span>
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">U</div>
            <span className="username">User</span>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        {currentChat?.messages.length === 0 ? (
          <div className="welcome-screen">
            <h1>Fake GPT</h1>
            <div className="welcome-message">
              <p>How can I not help you today?</p>
            </div>
          </div>
        ) : (
          <div className="messages">
            {currentChat?.messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-container">
                  <div className="avatar">
                    {message.role === 'user' ? 'U' : 'F'}
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="input-container">
          <form onSubmit={handleSubmit} className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Fake GPT..."
            />
            <button type="submit" className="send-button">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          <div className="input-footer">
            <p>Fake GPT won't make mistakes. It won't do anything.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 