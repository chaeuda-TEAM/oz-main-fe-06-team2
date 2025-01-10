'use client';

import ImageUploadForm, { ImageData } from '@/containers/forms/ImageUpload';
import LocationInfoForm, { LocationData } from '@/containers/forms/LocationInfo';
import PostDetailForm, { DetailData } from '@/containers/forms/PostDetail';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const CreatePost: React.FC = () => {
  const [postDetailData, setPostDetailData] = useState<DetailData | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  const handlePostDetailSubmit = (data: DetailData) => {
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

    const PostData = new FormData();

    const combinedData = {
      ...postDetailData,
      images: imageData.images,
      ...locationData,
    };

    PostData.append('data', JSON.stringify(combinedData));
    imageData.images.forEach(image => {
      PostData.append(`files`, image);
    });

    console.log('매물 등록 데이터:', combinedData);

    try {
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NDg2MjUwLCJpYXQiOjE3MzY0ODQ0NTAsImp0aSI6IjI3MTQ1YzE5NjUxNDQ1Zjg4MGExYzhkN2RkNmNmMzdjIiwidXNlcl9pZCI6MTV9.sWTye45xgMCqnzvxj6ZowD_TnzKORY-V5f-pfLRJwnc';
      if (!accessToken) {
        throw new Error('인증 토큰이 없습니다. 다시 로그인 해주세요.');
      }

      const response = await fetch(`${BASEURL}/api/product/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: PostData,
      });
      console.log('Response Status:', response.status);

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
