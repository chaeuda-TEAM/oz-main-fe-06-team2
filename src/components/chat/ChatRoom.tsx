import useAccessToken from '@/hooks/useAccessToken';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Send } from 'lucide-react';
import useAuthStore from '@/stores/authStore';
import { ChatRoomProps, Message } from '@/types/chat';

const ChatRoom: React.FC<ChatRoomProps> = ({ chatId }) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [senderNames, setSenderNames] = useState<Record<string | number, string>>({});
  const accessToken = useAccessToken();
  const { user, socialUser } = useAuthStore();
  const myName = user?.username || socialUser?.username;

  const connect = useCallback(() => {
    if (!accessToken) {
      setError('Failed to get accessToken');
      return;
    }

    setError(null);
    socketRef.current = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/${chatId}/?token=${encodeURIComponent(accessToken)}`,
    );

    socketRef.current.onopen = () => {
      setIsConnected(true);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    socketRef.current.onmessage = event => {
      console.log('Received message:', event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'error') {
          setError(`Server error: ${data.message}`);
        } else {
          // When sending a message, store the mapping of ID to name
          if (data.original_sender) {
            setSenderNames(prev => ({
              ...prev,
              [data.sender]: data.original_sender,
            }));
          }

          const newMessage: Message = {
            id: Date.now().toString(),
            content: data.message,
            // Use the stored name if available, otherwise use the ID
            sender: senderNames[data.sender] || data.sender,
            createdAt: new Date(data.created_at),
            chatRoom: data.chat_room,
          };
          setMessages(prev => [...prev, newMessage]);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
        setError('Failed to process incoming message');
      }
    };
    socketRef.current.onerror = error => {
      console.error('WebSocket error:', error);
      setError('WebSocket connection error. Attempting to reconnect...');
      setIsConnected(false);
    };

    socketRef.current.onclose = event => {
      console.log(`WebSocket connection closed for chat ${chatId}`, event.code, event.reason);
      setIsConnected(false);
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('Attempting to reconnect...');
        connect();
      }, 5000);
    };
  }, [accessToken, chatId]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const sendMessage = () => {
    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN &&
      inputMessage.trim()
    ) {
      const messageData = {
        message: inputMessage,
        sender: myName,
        original_sender: myName,
      };
      console.log(messageData);
      socketRef.current.send(JSON.stringify(messageData));
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <div className="flex-1 p-4 flex flex-col h-[300px]">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={clearError}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div className="flex-1 border p-4 overflow-y-auto mb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-4 ${
              senderNames[message.sender] === myName || message.sender === myName
                ? 'text-right'
                : 'text-left'
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">
              {senderNames[message.sender] || message.sender}
            </p>
            <div
              className={`inline-block p-3 ${
                senderNames[message.sender] === myName || message.sender === myName
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-stretch">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
          className="flex-1 p-2 border focus:outline-none"
          disabled={!isConnected}
        />
        <button
          onClick={sendMessage}
          disabled={!isConnected || !inputMessage.trim()}
          className="bg-kick text-white px-4 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
