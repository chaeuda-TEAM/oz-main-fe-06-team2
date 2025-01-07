import { SubmitHandler, useForm } from 'react-hook-form';
import { PostDetailInput1, PostDetailInput2 } from './PostDetailInput';
import { useState } from 'react';

interface PostDetailFormProps {
  onSubmitData: (data: FormData) => void;
}

export interface FormData {
  pro_title: string;
  pro_price: number;
  management_cost?: number;
  pro_type: string;
  pro_supply_a: number;
  pro_site_a: number;
  pro_floor: number;
  pro_rooms: number;
  pro_bathrooms: number;
  pro_heat: string;
  pro_construction_year: number;
  daescription: string;
}

const PostDetailForm: React.FC<PostDetailFormProps> = ({ onSubmitData }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedHeat, setSelectedHeat] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      management_cost: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    onSubmitData(data);
  };

  const handleTypeClick = (value: string) => {
    setSelectedType(value);
    setValue('pro_type', value);
  };

  const handleHeatClick = (value: string) => {
    setSelectedHeat(value);
    setValue('pro_heat', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-[0.9rem]">
      <h2 className="text-lg font-semibold mb-4">매물 정보</h2>
      <div className="space-y-5 text-[0.9rem]">
        <PostDetailInput1
          label="제목"
          htmlFor="pro_title"
          id1="pro_title"
          {...register('pro_title')}
          type="text"
          placeholder1="제목을 입력해주세요."
        />
        <PostDetailInput2
          label="매매 ∙ 관리비(선택)"
          htmlFor="pro_price"
          id1="pro_price"
          id2="management_cost"
          {...register('pro_price')}
          {...register('management_cost')}
          type="number"
          placeholder1="매매 가격을 입력해주세요."
          placeholder2="관리비용을 입력해주세요."
        />
        <label htmlFor="pro_type" id="pro_type" className="text-[0.95rem]">
          건물 유형
          <div id="pro_type" className="flex gap-3 mt-2 text-[0.8rem]">
            {[
              { value: 'detached', label: '단독주택' },
              { value: 'multi', label: '다세대주택' },
              { value: 'type_etc', label: '기타' },
            ].map(option => (
              <button
                key={option.value}
                type="button"
                value={option.value}
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
          <PostDetailInput1
            label="평수(공급면적)"
            htmlFor="pro_supply_a"
            id1="pro_supply_a"
            {...register('pro_supply_a')}
            type="number"
            placeholder1="평수를 입력해주세요."
          />
          <PostDetailInput1
            label="부지면적"
            htmlFor="pro_site_a"
            id1="pro_site_a"
            {...register('pro_site_a')}
            type="number"
            placeholder1="평수를 입력해주세요."
          />
        </div>
        <div className="grid grid-cols-3 gap-4 m-0">
          <PostDetailInput1
            label="층 수"
            htmlFor="pro_floor"
            id1="pro_floor"
            {...register('pro_floor')}
            type="number"
            placeholder1="층 수를 입력해주세요."
          />
          <PostDetailInput1
            label="방 수"
            htmlFor="pro_rooms"
            id1="pro_rooms"
            {...register('pro_rooms')}
            type="number"
            placeholder1="방 수를 입력해주세요."
          />
          <PostDetailInput1
            label="욕실 수"
            htmlFor="pro_bathrooms"
            id1="pro_bathrooms"
            {...register('pro_bathrooms')}
            type="number"
            placeholder1="욕실 수를 입력해주세요."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="pro_heat" className="text-[0.95rem]">
            난방 방식
            <div id="pro_heat" className="flex gap-3 mt-2 text-[0.8rem]">
              {[
                { value: 'gas', label: '가스보일러' },
                { value: 'oil', label: '기름보일러' },
                { value: 'briquette', label: '연탄보일러' },
                { value: 'heat_ect', label: '기타' },
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  value={option.value}
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
          <PostDetailInput1
            label="건축 연도"
            htmlFor="pro_construction_year"
            id1="pro_construction_year"
            {...register('pro_construction_year')}
            type="number"
            placeholder1="건축 연도를 입력해주세요."
          />
        </div>
        <label htmlFor="description" className="text-[0.95rem]">
          상세 설명
          <textarea
            id="daescription"
            {...register('daescription')}
            placeholder="집에 대한 상세 설명을 입력해주세요."
            className="w-full border border-gray-300 px-4 py-2 mt-2 text-[0.8rem]"
          ></textarea>
        </label>
      </div>
    </form>
  );
};

export default PostDetailForm;
