'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Result() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchImage = async () => {
      const { gender, answers } = router.query;
      if (!gender || !answers) return;

      try {
        const parsedAnswers = JSON.parse(answers as string);
        const validAnswers = parsedAnswers.filter(Boolean);

        if (validAnswers.length < 5) {
          console.error('⚠️ 너무 적은 응답:', validAnswers);
          return;
        }

        const accessoryPrompts = validAnswers
          .filter((answer: string) =>
            answer.includes('안경') || answer.includes('귀걸이') || answer.includes('악세서리')
          )
          .join(', ');

        const basePrompt = validAnswers
          .filter((answer: string) =>
            !answer.includes('안경') && !answer.includes('귀걸이') && !answer.includes('악세서리')
          )
          .join(', ');

        const prompt =
          basePrompt +
          (accessoryPrompts ? ', ' + accessoryPrompts : '') +
          (gender === 'female'
            ? ', photo of a beautiful young woman, DSLR quality, natural lighting, realistic face, clear eyes'
            : ', portrait of a confident young man, high-quality photo, studio lighting, realistic, detailed');

        console.log('📸 생성 프롬프트:', prompt);

        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            style: 'vivid', // 실사화 강조
          }),
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setImageUrl(data.url);
        } else {
          console.error('🚫 OpenAI 응답 오류:', data);
        }
      } catch (e) {
        console.error('❌ JSON 파싱 또는 API 오류:', e);
      }
    };

    fetchImage();
  }, [router.query]);

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">당신의 이상형 얼굴은?</h1>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Ideal Face"
          className="mx-auto rounded-xl shadow-lg"
        />
      ) : (
        <p>결과 생성 중...</p>
      )}
    </main>
  );
}
