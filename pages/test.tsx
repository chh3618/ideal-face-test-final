import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import questions from '../lib/questions';

export default function TestPage() {
  const router = useRouter();
  const { gender } = router.query;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (current >= questions[gender as string]?.length) {
      router.push({
        pathname: '/result',
        query: { gender, answers: JSON.stringify(answers) }
      });
    }
  }, [current]);

  if (!gender || !questions[gender]) return <p>잘못된 접근입니다.</p>;

  const q = questions[gender][current];

  return (
    <main className="p-8 max-w-xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Q{current + 1}. {q.question}</h2>
      <div className="flex flex-col gap-3">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => {
              setAnswers(prev => [...prev, opt]);
              setCurrent(c => c + 1);
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            {opt}
          </button>
        ))}
      </div>
    </main>
  );
}
