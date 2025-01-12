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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      // console.log('Received message:', event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'error') {
          setError(`Server error: ${data.message}`);
        } else if (data.type === 'connection_established') {
          const userInfo = data.user_info;
          setSenderNames(prev => ({
            ...prev,
            [userInfo.id]: userInfo.username,
          }));

          const prevMessages = (data.prev_messages || []).map((msg: any) => ({
            id: msg.id?.toString() || Date.now().toString(),
            content: msg.message || '',
            sender: msg.sender?.username || 'Unknown',
            createdAt: new Date(msg.created_at || Date.now()),
            chatRoom: msg.chat_room_id?.toString() || chatId,
          }));

          prevMessages.sort(
            (a: Message, b: Message) => a.createdAt.getTime() - b.createdAt.getTime(),
          );

          setMessages(prevMessages);
        } else {
          if (data.sender && typeof data.sender === 'object') {
            setSenderNames(prev => ({
              ...prev,
              [data.sender.id]: data.sender.username,
            }));
          }

          const newMessage: Message = {
            id: data.id?.toString() || Date.now().toString(),
            content: data.message || '',
            sender:
              (typeof data.sender === 'object' ? data.sender.username : data.sender) || 'Unknown',
            createdAt: new Date(data.created_at || Date.now()),
            chatRoom: data.chat_room_id?.toString() || chatId,
          };
          setMessages(prev => {
            const updatedMessages = [...prev, newMessage];
            return updatedMessages.sort(
              (a: Message, b: Message) => a.createdAt.getTime() - b.createdAt.getTime(),
            );
          });
        }
      } catch (err) {
        console.error('Error parsing message:', err);
        console.error('Raw message data:', event.data);
        setError('Failed to process incoming message');
      }
    };

    socketRef.current.onerror = error => {
      console.error('WebSocket error:', error);
      setError('WebSocket connection error. Attempting to reconnect...');
      setIsConnected(false);
    };

    socketRef.current.onclose = event => {
      // console.log(`WebSocket connection closed for chat ${chatId}`, event.code, event.reason);
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
      };
      socketRef.current.send(JSON.stringify(messageData));
      setInputMessage('');
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === myName ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.sender === myName ? 'order-1' : 'order-2'}`}>
              <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
              <div
                className={`p-3 rounded-lg ${
                  message.sender === myName ? 'bg-kick text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="break-words">{message.content}</p>
              </div>
              <p>{message.createdAt.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-stretch">
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요."
            className="flex-1 p-2 border rounded-l-md focus:outline-none"
            disabled={!isConnected}
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected || !inputMessage.trim()}
            className="bg-kick text-white px-4 rounded-r-md disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
