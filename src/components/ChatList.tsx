import { Chat } from '@/types/chat';

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chatId: number) => void;
  selectedChatId: number | null;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, selectedChatId }) => {
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
    </div>
  );
};

export default ChatList;
