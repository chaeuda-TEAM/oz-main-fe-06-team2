import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    daum: {
      Postcode: new (options: { oncomplete: (data: PostcodeData) => void }) => { open: () => void };
    };
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Geocoder: new () => {
          geocode: (address: string[], callback: (result: any, status: string) => void) => void;
        };
      };
    };
  }
}

interface PostcodeData {
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
}

export interface LocationData {
  add_new: string;
  add_old: string;
  detailAddress?: string;
  latitude: number;
  longitude: number;
}

interface LocationInfoFormProps {
  onSubmitData: (data: LocationData) => void;
}

const LocationInfoForm: React.FC<LocationInfoFormProps> = ({ onSubmitData }) => {
  const addressRef = useRef<HTMLInputElement>(null);
  const zonecodeRef = useRef<HTMLInputElement>(null);
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadKakaoMap = () => {
      const existingScript = document.querySelector('script[src*="postcode.v2.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.head.appendChild(script);
      }

      const kakaoScript = document.createElement('script');
      kakaoScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services&autoload=false`;
      kakaoScript.async = true;

      kakaoScript.onload = () => {
        window.kakao.maps.load(() => {
          setIsKakaoLoaded(true);
          console.log('카카오맵 API 로드 완료');
        });
      };

      document.head.appendChild(kakaoScript);
    };

    loadKakaoMap();
  }, []);

  const openPostcodeSearch = () => {
    if (!window.daum || !window.daum.Postcode) return;

    const postcode = new window.daum.Postcode({
      oncomplete: (data: PostcodeData) => {
        if (addressRef.current && zonecodeRef.current) {
          addressRef.current.value = data.roadAddress;
          zonecodeRef.current.value = data.zonecode;

          if (isKakaoLoaded && window.kakao) {
            const geocoder = new window.kakao.services.Geocoder();
            console.log('Geocoding 시작:', data.roadAddress);

            // 주소가 유효한지 확인
            if (!data.roadAddress) {
              console.error('유효한 주소가 없습니다.');
              return;
            }

            // Geocoding 실행
            geocoder.geocode([data.roadAddress], (result, status) => {
              if (status === 'OK' && result.length > 0) {
                const lat = result[0].y;
                const lng = result[0].x;
                setLatitude(lat);
                setLongitude(lng);

                // 데이터 전달
                onSubmitData({
                  add_new: data.roadAddress,
                  add_old: data.jibunAddress,
                  detailAddress,
                  latitude: lat,
                  longitude: lng,
                });

                console.log('경도위도 결과:', { lat, lng });
              } else {
                console.error(`Geocoding 실패: ${status}`);
              }
            });
          } else {
            console.error('Kakao Maps API가 로드되지 않았습니다.');
          }
        }
      },
    });
    postcode.open();
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDetailAddress = e.target.value;
    setDetailAddress(newDetailAddress);
  };

  return (
    <div className="w-[500px]">
      <h2 className="text-lg font-semibold mb-4">위치 정보</h2>
      <div className="">
        <label className="text-[0.95rem] flex-1">
          주소
          <div className="flex items-center space-x-2">
            <input
              ref={zonecodeRef}
              id="address1"
              placeholder="우편번호를 입력해주세요."
              className="w-[250px] border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
              readOnly
            />
            <button
              type="button"
              onClick={openPostcodeSearch}
              className="w-[120px] h-[37px] mb-2 text-[0.8rem] bg-gray-300"
            >
              주소 검색하기
            </button>
          </div>
          <input
            ref={addressRef}
            type="text"
            placeholder="주소를 입력해주세요."
            className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
            readOnly
          ></input>
        </label>
        <label htmlFor="address2" className="text-[0.95rem]">
          상세주소(선택)
          <input
            id="address2"
            type="text"
            placeholder="상세주소를 입력해주세요."
            value={detailAddress}
            onChange={handleDetailAddressChange}
            className="w-full border border-gray-300 px-4 py-2 mt-2 mb-4 text-[0.8rem]"
          />
        </label>
      </div>
    </div>
  );
};

export default LocationInfoForm;
