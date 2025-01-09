import { Chat } from '@/types/chat';

export const fetchChatList = async (accessToken: string): Promise<Chat[]> => {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('BASE_URL is not defined');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/list`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data.chat_rooms || [];
  } catch (error) {
    console.error('Error fetching chat list:', error);
    throw error;
  }
};
