import React, { useState, useRef, useEffect } from 'react';
import { Plus, Send, Trash2, MessageSquare } from 'lucide-react';
import PaperGen from './PaperGen';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const API_KEY = "AIzaSyACs27id08grEM8zZ3V44vNfIprnoh9nHs"; // Replace with your actual API key

async function getTextResponse(prompt: string) {
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "contents": [{ "parts": [{ "text": prompt }] }] })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "Error: " + error.message;
    }
}

function Chat() {
  const [showPaperGen, setShowPaperGen] = useState(false);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'default',
      title: 'New Chat',
      messages: [],
      createdAt: new Date()
    }
  ]);
  const [activeChat, setActiveChat] = useState('default');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChat]);

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === activeChat) || chats[0];
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date()
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(chats[0]?.id || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      ));
      setMessage('');
      setIsTyping(true);

      // Update chat title if it's the first message
      const currentChat = getCurrentChat();
      if (currentChat.messages.length === 0) {
        setChats(prev => prev.map(chat =>
          chat.id === activeChat
            ? { ...chat, title: message.slice(0, 30) + (message.length > 30 ? '...' : '') }
            : chat
        ));
      }

      // Get bot response
      const botResponse = await getTextResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setChats(prev => prev.map(chat =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, botMessage] }
          : chat
      ));
      setIsTyping(false);
    }
  };

  if (showPaperGen) {
    return <PaperGen />;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <div className="w-64 mt-[88px] bg-gray-50 border-r border-gray-200 flex flex-col">
        <button
          onClick={createNewChat}
          className="m-3 flex items-center justify-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New chat</span>
        </button>

        <div className="flex-grow overflow-y-auto p-2 space-y-2">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                activeChat === chat.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="flex items-center gap-2 truncate">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span className="truncate">{chat.title}</span>
              </div>
              {activeChat === chat.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-h-screen  mt-[88px]">
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          {getCurrentChat().messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'assistant' ? 'bg-gray-50' : ''} -mx-4 px-4 py-6`}
            >
              <div className="flex-1 max-w-3xl mx-auto flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === 'assistant' ? 'bg-green-500' : 'bg-gray-800'
                }`}>
                  {msg.sender === 'assistant' ? '🤖' : '👤'}
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1">
                    {msg.sender === 'assistant' ? 'Assistant' : 'You'}
                  </div>
                  <div className="text-gray-700 leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex bg-gray-50 -mx-4 px-4 py-6">
              <div className="flex-1 max-w-3xl mx-auto flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  🤖
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-0"
              placeholder="Send a message..."
            />
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="max-w-3xl mx-auto mt-2 text-center text-xs text-gray-500">
            Free Research Preview.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
