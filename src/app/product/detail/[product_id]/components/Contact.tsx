'use client';

import { useState } from 'react';
import { ChevronDown, Copy } from 'lucide-react';

interface ContactProps {
  phone_number: string;
}

export const Contact = ({ phone_number }: ContactProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(phone_number);
      alert('전화번호가 복사되었습니다.');
    } catch (err) {
      alert('복사에 실패했습니다.');
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
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">판매자 휴대폰번호</span>
              <div>
                <span>{phone_number}</span>
                <button onClick={handleCopyClick} className="p-2 hover:bg-gray-200 rounded-full">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-gray-500 text-white hover:bg-gray-600">채팅</button>
        </div>
      )}
    </div>
  );
};
