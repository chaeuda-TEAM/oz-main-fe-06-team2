'use client';

import { useState } from 'react';
import { ChevronDown, Copy } from 'lucide-react';
import { createChatRequest } from '@/api/chat';
import useAccessToken from '@/hooks/useAccessToken';

interface ContactProps {
  phone_number: string;
  productId: string;
}

const formatPhoneNumber = (phone: string) => {
  const numbers = phone.replace(/[^\d]/g, '');

  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (numbers.length === 10) {
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

export const Contact = ({ phone_number, productId }: ContactProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const accessToken = useAccessToken();

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(phone_number);
      alert('전화번호가 복사되었습니다.');
    } catch (err) {
      alert('복사에 실패했습니다.');
    }
  };

  const handleChatButton = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    if (!accessToken) return;

    try {
      const response = await createChatRequest(accessToken, parseInt(productId, 10));

      if (response.success) {
        alert('채팅방이 생성되었습니다.');
      } else {
        setErrorMessage(response.message || '채팅방 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('채팅방 생성 오류: ', error);
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center bg-red-500 text-white"
      >
        <span className="font-medium">문의</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-4 space-y-3 bg-gray-50">
          <div className="flex flex-col">
            <div className="font-semibold">판매자 휴대폰번호</div>
            <div>
              <span>{formatPhoneNumber(phone_number)}</span>
              <button onClick={handleCopyClick} className="ml-5 p-2 hover:bg-gray-200 rounded-full">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button
            onClick={handleChatButton}
            className={`w-full py-3 text-white ${isLoading ? 'bg-gray-400' : 'bg-gray-500 hover:bg-gray-600'}`}
            disabled={isLoading}
          >
            {isLoading ? '생성 중...' : '채팅'}
          </button>
        </div>
      )}
    </div>
  );
};
