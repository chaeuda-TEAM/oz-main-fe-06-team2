'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const [selectedType, setSelectedType] = useState('');
  const [selectedHeat, setSelectedHeat] = useState('');

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleTypeClick = (value: string) => {
    setSelectedType(value);
  };

  const handleHeatClick = (value: string) => {
    setSelectedHeat(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-4/6 space-y-5 m-auto text-[0.9rem]">
      <h2 className="text-lg font-semibold text-kick mb-4">매물 올리기</h2>
      <div>이미지&동영상 들어가는 공간</div>

      <div className="space-y-5 text-[0.9rem]">
        <label htmlFor="pro_title" className="text-[0.95rem]">
          제목
          <input
            id="pro_title"
            type="text"
            {...register('pro_title')}
            placeholder="제목을 입력해주세요."
            className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
          />
        </label>

        <label htmlFor="pro_price" className="text-[0.95rem]">
          매매 ∙ 관리비(선택)
          <div className="grid grid-cols-2 gap-4 mt-2 mb-4 text-[0.8rem]">
            <input
              id="pro_price"
              type="number"
              {...register('pro_price')}
              placeholder="매매 가격을 입력해주세요."
              className="border border-gray-300 px-4 py-2"
            />
            <input
              id="management_cost"
              type="number"
              {...register('management_cost')}
              placeholder="관리비용을 입력해주세요."
              className="border border-gray-300 px-4 py-2"
            />
          </div>
        </label>

        <label htmlFor="pro_type" className="text-[0.95rem]">
          건물 유형
          <div className="flex gap-3 mt-2 text-[0.8rem]">
            {[
              { value: 'detached', label: '단독주택' },
              { value: 'multi', label: '다세대주택' },
              { value: 'type_etc', label: '기타' },
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleTypeClick(option.value)}
                className={`w-[80px] border py-2 ${
                  selectedType === option.value ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <input id="pro_type" type="hidden" {...register('pro_type')} />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="pro_supply_a" className="text-[0.95rem]">
            평수(공급면적)
            <input
              id="pro_supply_a"
              type="number"
              {...register('pro_supply_a')}
              placeholder="평수를 입력해주세요."
              className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
            />
          </label>
          <label htmlFor="pro_site_a" className="text-[0.95rem]">
            부지면적
            <input
              id="pro_site_a"
              type="number"
              {...register('pro_site_a')}
              placeholder="평수를 입력해주세요."
              className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
            />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4 m-0">
          <label htmlFor="pro_floor" className="text-[0.95rem]">
            층 수
            <input
              id="pro_floor"
              type="number"
              {...register('pro_floor')}
              placeholder="층 수를 입력해주세요."
              className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
            />
          </label>
          <label htmlFor="pro_rooms" className="text-[0.95rem]">
            방 수
            <input
              id="pro_rooms"
              type="number"
              {...register('pro_rooms')}
              placeholder="방 수를 입력해주세요."
              className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
            />
          </label>
          <label htmlFor="pro_bathrooms" className="text-[0.95rem]">
            욕실 수
            <input
              id="pro_bathrooms"
              type="number"
              {...register('pro_bathrooms')}
              placeholder="욕실 수를 입력해주세요."
              className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="pro_heat" className="text-[0.95rem]">
            난방 방식
            <div className="flex gap-3 mt-2 text-[0.8rem]">
              {[
                { value: 'gas', label: '가스보일러' },
                { value: 'oil', label: '기름보일러' },
                { value: 'briquette', label: '연탄보일러' },
                { value: 'heat_ect', label: '기타' },
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleHeatClick(option.value)}
                  className={`w-[80px] border py-2 ${
                    selectedHeat === option.value
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <input id="pro_heat" type="hidden" {...register('pro_heat')} />
          </label>

          {/* 건축 연도 */}
          <label htmlFor="pro_construction_year" className="text-[0.95rem]">
            건축 연도
            <input
              id="pro_construction_year"
              type="number"
              {...register('pro_construction_year')}
              placeholder="건축 연도를 입력해주세요."
              className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
            />
          </label>
        </div>

        <label htmlFor="description" className="text-[0.95rem]">
          상세 설명
          <textarea
            id="description"
            {...register('description')}
            placeholder="집에 대한 상세 설명을 입력해주세요."
            className="w-full border border-gray-300 px-4 py-2 mt-2 text-[0.8rem]"
          ></textarea>
        </label>
      </div>

      <div className="text-center py-4">
        <button type="submit" className="px-6 py-2 bg-kick text-white">
          매물 등록
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
