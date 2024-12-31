const googleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/login/dev`;
};

const GoogleBtn = () => {
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      // console.log('로그인 성공:', result);
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
    }
  };

  return (
    <>
      <button onClick={handleGoogleLogin}>구글로 시작하기</button>
    </>
  );
};

export default GoogleBtn;
