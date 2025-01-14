import React, { useState } from 'react';
import useAuthStore from '@/stores/authStore';
import { ChatListProps } from '@/types/chat';
import { MessageSquare } from 'lucide-react';

type FilterType = 'all' | 'buy' | 'sell';

const ChatList: React.FC<ChatListProps> = ({ initialChats, onSelectChat, selectedChatId }) => {
  const { user } = useAuthStore();
  const myName = user?.username;
  const [filteredChats, setFilteredChats] = useState(initialChats);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const onFilterBuy = (buyer: string) => {
    const filtered = initialChats.filter(chat => chat.buyer === buyer);
    setFilteredChats(filtered);
    setActiveFilter('buy');
  };

  const onFilterSell = (seller: string) => {
    const filtered = initialChats.filter(chat => chat.seller === seller);
    setFilteredChats(filtered);
    setActiveFilter('sell');
  };

  const resetFilter = () => {
    setFilteredChats(initialChats);
    setActiveFilter('all');
  };

  const getButtonClass = (filterType: FilterType) => {
    const baseClass = 'w-full py-2 px-4 transition-colors';
    const activeClass = 'text-kick border-b-2 border-kick font-medium';
    const inactiveClass = 'text-[#71829b] hover:text-kick';

    return `${baseClass} ${activeFilter === filterType ? activeClass : inactiveClass}`;
  };

  return (
    <div className="h-full border-r border-[#d9d9d9] bg-white flex flex-col">
      <div className="p-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-[#181818] font-medium">채팅 목록</p>
            <MessageSquare size={20} className="text-[#71829b]" />
          </div>
          <nav className="w-full">
            <ul className="flex justify-between text-sm">
              <li className="flex-1">
                <button className={getButtonClass('all')} onClick={resetFilter}>
                  전체
                </button>
              </li>
              <li className="flex-1">
                <button className={getButtonClass('buy')} onClick={() => onFilterBuy(myName || '')}>
                  구매
                </button>
              </li>
              <li className="flex-1">
                <button
                  className={getButtonClass('sell')}
                  onClick={() => onFilterSell(myName || '')}
                >
                  판매
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <p className="text-[#939393] text-sm p-3 text-center">채팅 목록이 없습니다.</p>
        ) : (
          <ul>
            {filteredChats.map(chat => (
              <li key={chat.id}>
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full p-3 text-left transition-colors ${
                    selectedChatId === chat.id
                      ? 'bg-gray-100 text-kick'
                      : 'text-[#181818] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium block">{chat.product_title}</span>
                  <span className="text-xs text-gray-500">{chat.seller}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatList;
