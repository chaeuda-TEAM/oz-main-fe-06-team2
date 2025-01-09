'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, MapPin } from 'lucide-react';
import ChatList from '@/components/ChatList';
// import ChatDisplay from '@/components/ChatDisplay';
import { Chat, Message } from '@/types/chat';
import { fetchChatList } from '@/api/chat';

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const accessToken = '';

  useEffect(() => {
    const loadChatList = async () => {
      if (!accessToken) {
        router.push('/auth/signIn');
        return;
      }

      try {
        setIsLoading(true);
        const chats = await fetchChatList(accessToken);
        setChatList(chats);
        if (chats.length > 0) {
          setSelectedChatId(chats[0].id);
        }
      } catch (err) {
        setError('Failed to load chat list. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadChatList();
  }, [accessToken, router]);

  const handleChatCreated = (newChat: Chat) => {
    setChatList(prevChats => [newChat, ...prevChats]);
    setSelectedChatId(newChat.id);
  };

  const selectedChat = chatList.find(chat => chat.id === selectedChatId);

  const dummyMessages: Message[] = [
    { id: '1', user: '한효찬', content: '안녕하세요' },
    { id: '2', user: '주민재', content: '안녕하세요' },
    { id: '3', user: '한효찬', content: '오늘 날씨가 좋네요' },
    { id: '4', user: '주민재', content: '네, 정말 좋습니다' },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className={`md:w-64 bg-white md:block transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <ChatList
          initialChats={chatList}
          onSelectChat={setSelectedChatId}
          selectedChatId={selectedChatId}
          onChatCreated={handleChatCreated}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md flex items-center justify-between p-4">
          {selectedChat ? (
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {selectedChat.product_title}
              </h1>

              <div className="flex items-center text-gray-600 mt-1">
                <span className="text-lg font-semibold">
                  {selectedChat.seller} - {selectedChat.product_price.toLocaleString()}원
                </span>
              </div>
              <div className="flex items-center text-gray-500 mt-1">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{selectedChat.product_address}</span>
              </div>
            </div>
          ) : (
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">채팅을 선택해주세요</h1>
          )}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
        </header>
        {/* <ChatDisplay messages={dummyMessages} /> */}
      </div>
    </div>
  );
};

export default ChatPage;
