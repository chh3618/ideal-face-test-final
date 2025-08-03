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

        const personality = validAnswers.join(', ');
        const basePrompt =
          gender === 'female'
            ? 'young Korean woman, DSLR portrait, soft smile, clear skin, realistic photo'
            : 'young Korean man, cinematic portrait, calm expression, DSLR quality, realistic photo';

        // 악세서리 관련 단어가 포함되어 있으면 강조
        const accessories = validAnswers.filter(a =>
          /(안경|귀걸이|피어싱|accessory|earring|glasses)/i.test(a)
        );

        const prompt = `${personality}${accessories.length ? ', ' + accessories.join(', ') : ''}, ${basePrompt}`;

        console.log('👉 최종 프롬프트:', prompt);

        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        if (res.ok) {
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
        <img src={imageUrl} alt="Ideal Face" className="mx-auto rounded-xl shadow-lg" />
      ) : (
        <p>결과 생성 중... 잠시만 기다려 주세요.</p>
      )}
    </main>
  );
}
