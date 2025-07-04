import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <h1 className="text-3xl font-bold">이상형 테스트</h1>
      <p>당신의 이상형을 찾아보세요!</p>
      <div className="flex gap-4">
        <button onClick={() => router.push('/test?gender=male')} className="px-6 py-2 bg-blue-500 text-white rounded-xl">남자</button>
        <button onClick={() => router.push('/test?gender=female')} className="px-6 py-2 bg-pink-500 text-white rounded-xl">여자</button>
      </div>
    </main>
  );
}
