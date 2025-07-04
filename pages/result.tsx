import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Result() {
  const router = useRouter();
  const { gender, answers } = router.query;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (answers) {
      const parsed = JSON.parse(answers as string);
      const prompt = parsed.join(', ') + " 스타일의 " + (gender === 'female' ? "20대 초반 여성 얼굴" : "20대 초반 남성 얼굴");

      // 이미지 생성 로직 연동 전 placeholder
      setImageUrl("/sample-face.png");
    }
  }, [answers, gender]);

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">당신의 이상형 얼굴은?</h1>
      {imageUrl ? (
        <img src={imageUrl} alt="Ideal Face" className="mx-auto rounded-xl shadow-lg" />
      ) : (
        <p>결과 생성 중...</p>
      )}
      <button onClick={() => router.push('/')} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded">처음으로</button>
    </main>
  );
}
