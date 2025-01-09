import { createChatRequest } from '@/api/chat';
import { Chat, ChatListProps } from '@/types/chat';
import { useState } from 'react';

const ChatList: React.FC<ChatListProps> = ({
  initialChats,
  onSelectChat,
  selectedChatId,
  onChatCreated,
}) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateChat = async () => {
    setLoading(true);
    setError(null);

    const accessToken = '';

    try {
      const response = await createChatRequest(accessToken, 6);

      if (response.success) {
        const newChat = response.chatRoom;
        setChats(prevChats => [...prevChats, newChat]);
        if (onChatCreated) onChatCreated(newChat);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('에러 발생');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-lg md:text-xl font-bold mb-4">채팅 목록</h2>
      {chats.length === 0 ? (
        <p className="text-gray-500">채팅 목록이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {chats.map(chat => (
            <li key={chat.id}>
              <button
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedChatId === chat.id
                    ? 'bg-blue-100 hover:bg-blue-200'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-lg truncate">{chat.product_title}</span>
                  <span className="text-sm text-gray-600">
                    {chat.product_price.toLocaleString()}원
                  </span>
                  <span className="text-xs text-gray-500 truncate">{chat.product_address}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleCreateChat}
        disabled={loading}
        className="bg-kick text-white p-2 rounded mt-4"
      >
        {loading ? '생성 중...' : '채팅방 생성(임시)'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ChatList;
