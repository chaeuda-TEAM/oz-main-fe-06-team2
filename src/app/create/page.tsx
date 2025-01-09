'use client';

import ImageUploadForm, { ImageData } from '@/containers/forms/ImageUpload';
import LocationInfoForm, { LocationData } from '@/containers/forms/LocationInfo';
import PostDetailForm, { FormData } from '@/containers/forms/PostDetail';
import { useState } from 'react';
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const CreatePost: React.FC = () => {
  const [postDetailData, setPostDetailData] = useState<FormData | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  const handlePostDetailSubmit = (data: FormData) => {
    setPostDetailData(data);
  };

  const handleImageUploadSubmit = (data: ImageData) => {
    setImageData(data);
  };

  const handleLocationSubmit = (data: LocationData) => {
    setLocationData(data);
  };

  const createPost = async () => {
    if (!postDetailData || !imageData || !locationData) {
      alert('모든 폼을 작성해주세요.');
      console.log(postDetailData);
      console.log(imageData);
      console.log(locationData);

      return;
    }

    const combinedData = {
      ...postDetailData,
      ...imageData,
      ...locationData,
    };

    try {
      const response = await fetch(`${BASEURL}/api/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API 응답 성공:', result);
        alert('매물이 성공적으로 등록되었습니다!');
      } else {
        const errorData = await response.json();
        console.error('API 응답 실패:', errorData);
        alert(`매물 등록에 실패했습니다: ${errorData.message}`);
      }
    } catch (error) {
      console.error('API 요청 에러:', error);
      alert('매물 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="w-[800px] mx-auto p-10 space-y-8">
      <h1 className="text-2xl font-bold text-kick">매물 올리기</h1>
      <ImageUploadForm onSubmitData={handleImageUploadSubmit} />
      <PostDetailForm onSubmitData={handlePostDetailSubmit} />
      <LocationInfoForm onSubmitData={handleLocationSubmit} />
      <div className="flex justify-end">
        <button onClick={createPost} className="px-4 py-2 bg-kick text-white">
          매물 등록
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
