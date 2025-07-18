import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Result() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 추가

  useEffect(() => {
    const fetchImage = async () => {
      // 로딩 상태 시작
      setLoading(true); 
      setError(null); // 새로운 요청 전에 에러 초기화

      // router.query가 준비되었는지 확인 (새로고침 시 쿼리가 없는 경우 방지)
      const { gender, answers } = router.query;

      if (!router.isReady || !gender || !answers) {
        // 쿼리가 아직 준비되지 않았거나 필요한 값이 없으면 함수 종료
        // 이 경우 setLoading(false)는 필요 없음. 다시 렌더링될 때 fetchImage가 재실행될 것임.
        return; 
      }

      try {
        // 사용자 답변 파싱 및 유효성 검사
        const parsedAnswers = JSON.parse(answers as string);
        const validAnswers = parsedAnswers.filter(Boolean); // null, undefined, 빈 문자열 제거

        if (validAnswers.length === 0) { // 최소 답변 개수 5개는 백엔드에서 체크하는게 더 좋지만, 여기서도 간단히 검사.
          console.error('⚠️ 응답이 너무 적거나 유효하지 않습니다.');
          setError('답변이 불충분하여 이미지를 생성할 수 없습니다. 다시 시도해주세요.');
          setLoading(false);
          return;
        }

        // --- 동적 프롬프트 생성 로직 시작 ---
        // gender를 사용하여 프롬프트에 성별을 명시할 수 있습니다.
        // 예를 들어, 'gender'가 'male'이면 "handsome male..."
        // 'female'이면 "beautiful female..."
        const baseSubject = gender === 'male' ? 'a handsome male' : 'a beautiful female';

        // validAnswers 배열을 조합하여 상세 프롬프트 생성
        // 각 답변이 AI에게 인물의 특징을 묘사하는 키워드가 되도록 합니다.
        const dynamicDescription = validAnswers.join(', '); // 예: "energetic, kind, intelligent, fashion-conscious"

        // 최종 프롬프트 (Stable Diffusion이 이해하기 좋게 구체적으로 작성)
        const prompt = `${baseSubject}, ${dynamicDescription}, high detailed portrait, realistic, 4k, professional photography, natural light, studio lighting, --ar 1:1`;
        // `--ar 1:1`은 Stable Diffusion에서 이미지 비율을 1:1로 설정하는 프롬프트 문법 (일반 프롬프트에 추가)
        // Stable Diffusion은 'digital art'보다 'realistic', 'photography' 같은 단어에 더 잘 반응하기도 합니다.

        console.log('👉 생성할 프롬프트:', prompt);
        // --- 동적 프롬프트 생성 로직 끝 ---

        // `/api/generate` API 라우트 호출
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }), // 동적으로 생성된 프롬프트 전달
        });

        const data = await res.json(); // 응답을 JSON으로 파싱

        if (res.ok) { // HTTP 상태 코드가 200번대인 경우
          // `data.imageUrl`로 Base64 문자열이 온다고 가정
          setImageUrl(data.imageUrl); 
          console.log('✅ 이미지 생성 성공:', data.imageUrl ? 'Base64 이미지 데이터 수신' : 'URL 수신');
        } else {
          // HTTP 상태 코드가 200번대가 아닌 경우 (예: 400, 500)
          const errorMessage = data.error || '알 수 없는 서버 오류가 발생했습니다.';
          const errorDetail = data.detail ? JSON.stringify(data.detail) : ''; // 상세 에러 정보
          console.error('🚫 이미지 생성 오류:', errorMessage, errorDetail);
          setError(`이미지 생성 실패: ${errorMessage}. ${errorDetail}`); // 사용자에게 보여줄 에러 메시지
        }
      } catch (e: any) { // 네트워크 오류 등 예외 처리
        console.error('❌ API 요청 또는 JSON 파싱 오류:', e);
        setError(`네트워크 오류 또는 데이터 처리 오류: ${e.message}`);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    // router.isReady를 사용하여 쿼리 파라미터가 모두 로드되었는지 확인 후 fetchImage 호출
    if (router.isReady) {
      fetchImage();
    }
  }, [router]); // router 객체가 변경될 때마다 useEffect 재실행 (주로 isReady 상태 변화)

  return (
    <main className="p-6 text-center min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-700">당신의 이상형은?</h1>

      {loading && !imageUrl && !error && (
        <div className="flex flex-col items-center">
          <p className="text-xl text-gray-700 mb-4">✨ 당신의 이상형을 AI가 그리고 있어요... ✨</p>
          {/* 로딩 스피너 등을 여기에 추가할 수 있습니다 */}
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">오류 발생!</strong>
          <span className="block sm:inline"> {error}</span>
          <p className="text-sm mt-2">프롬프트가 너무 구체적이거나 정책에 위배될 수 있습니다. <br/> 질문 페이지로 돌아가서 다시 시도해보세요.</p>
          <button 
            onClick={() => router.push('/questions')} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            다시 테스트하기
          </button>
        </div>
      )}

      {imageUrl && !loading && !error && (
        <div className="flex flex-col items-center">
          <p className="text-xl text-gray-800 mb-6">짜잔! 당신의 이상형은 이런 모습이군요!</p>
          <img 
            src={imageUrl} 
            alt="Ideal Face" 
            className="max-w-full h-auto rounded-2xl shadow-xl border-4 border-blue-300 transform transition-transform duration-300 hover:scale-105" 
            style={{ maxWidth: '512px', maxHeight: '512px' }} // 이미지 크기 제한 (Stable Diffusion 생성 크기에 맞춤)
          />
          <button 
            onClick={() => {
              // 인스타그램 공유는 직접 이미지 업로드가 안되므로, 캡쳐 유도 또는 웹사이트 공유 유도
              alert("이 이미지를 길게 눌러 저장하거나 스크린샷을 찍어 인스타그램에 공유해주세요!\n\n#나의AI이상형 #이상형테스트");
              // 원하는 경우 웹사이트 URL을 클립보드에 복사할 수도 있습니다.
              navigator.clipboard.writeText(window.location.origin + '?share=true').then(() => {
                console.log('Share URL copied to clipboard');
              }).catch(err => console.error('Failed to copy text: ', err));
            }} 
            className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md"
          >
            📸 인스타그램에 공유하기
          </button>
          <button 
            onClick={() => router.push('/questions')} 
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
          >
            다시 테스트하기
          </button>
        </div>
      )}
    </main>
  );
}