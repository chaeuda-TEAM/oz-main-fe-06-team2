'use client';

import React, { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useForm } from 'react-hook-form';

const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const [selectedType, setSelectedType] = useState('');
  const [selectedHeat, setSelectedHeat] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const onSubmit = (data: any) => {
    console.log({ ...data, address, latitude, longitude });
  };

  const handleTypeClick = (value: string) => {
    setSelectedType(value);
  };

  const handleHeatClick = (value: string) => {
    setSelectedHeat(value);
  };

  const searchAddressToCoordinate = (address: string) => {
    // if (!window.naver || !map || !marker) return;

    window.naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === window.naver.maps.Service.Status.ERROR) {
          console.log('Something Wrong!');
          return;
        }

        if (response.v2.meta.totalCount === 0) {
          console.log('totalCount' + response.v2.meta.totalCount);
          return;
        }

        const item = response.v2.addresses[0];
        const point = new window.naver.maps.Point(Number(item.x), Number(item.y));

        console.log({
          address: item.roadAddress || item.jibunAddress,
          coordinate: {
            lat: Number(item.y),
            lng: Number(item.x),
          },
        });
      },
    );
  };

  const handleAddressComplete = (data: any) => {
    const fullAddress = data.address;
    setAddress(fullAddress);
    setIsPostcodeOpen(false);

    searchAddressToCoordinate(fullAddress);
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

        <h2 className="text-xl">매물 정보</h2>
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
      <h2 className="text-lg font-semibold mb-4">위치 정보</h2>
      <div className="space-y-5">
        <label htmlFor="address" className="text-[0.95rem]">
          주소
          <div className="flex items-center mt-2">
            <input
              id="address"
              type="text"
              value={address}
              readOnly
              placeholder="주소를 검색해주세요."
              className="w-[400px] border border-gray-300 px-4 py-2 text-[0.8rem]"
            />
            <button
              type="button"
              onClick={() => setIsPostcodeOpen(true)}
              className="ml-4 px-4 py-2 bg-kick text-white"
            >
              주소 검색
            </button>
          </div>
        </label>
        {isPostcodeOpen && (
          <div className="mt-4">
            <DaumPostcodeEmbed onComplete={handleAddressComplete} />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-[0.9rem]">
          <span className="font-semibold">위도:</span> {latitude}
        </p>
        <p className="text-[0.9rem]">
          <span className="font-semibold">경도:</span> {longitude}
        </p>
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
