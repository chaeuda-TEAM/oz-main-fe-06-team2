import Image from 'next/image';

const NaverBtn = () => {
  return (
    <button className="flex items-center justify-center w-full p-2 mt-4 bg-naver text-white ">
      <Image src="/socialLogo/Naver.png" alt="Naver" width={26} height={26} className="mr-2" />
      <span>네이버로 시작하기</span>
    </button>
  );
};

export default NaverBtn;
