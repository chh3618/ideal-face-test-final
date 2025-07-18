// pages/questions.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { maleQuestions, femaleQuestions, Question } from '../types/questionsData'; // 질문 데이터 임포트 (경로 확인!)

export default function QuestionsPage() {
  const router = useRouter();
  // 성별 상태 (기본값은 빈 문자열, 사용자가 선택해야 함)
  const [selectedGender, setSelectedGender] = useState<string>(''); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]); // AI 프롬프트 키워드를 저장할 배열
  const [selectedOptionForCurrentQuestion, setSelectedOptionForCurrentQuestion] = useState<string>(''); // 현재 질문에 선택된 답변의 value

  // 라우터 쿼리에서 성별 가져오기
  useEffect(() => {
    if (router.isReady && router.query.gender && typeof router.query.gender === 'string') {
      setSelectedGender(router.query.gender);
    }
  }, [router.isReady, router.query.gender]);

  // 현재 성별에 맞는 질문 리스트 선택
  const questionsToDisplay: Question[] = selectedGender === 'male' ? maleQuestions : femaleQuestions;

  // 라디오 버튼 선택 시 호출될 함수
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionForCurrentQuestion(event.target.value);
  };

  // '다음 질문' 또는 '결과 보기' 버튼 클릭 시 호출될 함수
  const handleNextQuestion = () => {
    // 현재 질문에 답변이 선택되었는지 확인
    if (!selectedOptionForCurrentQuestion) {
      alert('답변을 선택해주세요!');
      return;
    }

    // 현재 질문의 답변을 answers 배열에 추가 (현재 선택된 옵션은 아직 answers 배열에 없음)
    setAnswers(prevAnswers => [...prevAnswers, selectedOptionForCurrentQuestion]);
    setSelectedOptionForCurrentQuestion(''); // 다음 질문을 위해 현재 선택된 옵션 초기화

    // 모든 질문이 끝났는지 확인
    if (currentQuestionIndex < questionsToDisplay.length - 1) {
      // 다음 질문으로 이동
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // 모든 질문이 끝났으므로 결과 페이지로 이동
      // 마지막 답변까지 포함하여 answers 배열을 JSON 문자열로 변환하여 쿼리 파라미터로 전달
      router.push({
        pathname: '/result',
        query: {
          gender: selectedGender,
          answers: JSON.stringify([...answers, selectedOptionForCurrentQuestion]), 
        },
      });
    }
  };

  // 아직 성별이 선택되지 않았을 경우, 성별 선택 UI를 보여줌
  if (!selectedGender) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 animate-fade-in">나의 AI 이상형 찾기 테스트 💖</h1>
        <p className="text-xl text-gray-700 mb-6">당신의 이상형을 찾아줄게요!</p>
        <div className="flex space-x-6">
          <button 
            onClick={() => router.push({ pathname: router.pathname, query: { gender: 'male' } })} 
            className="flex flex-col items-center p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span role="img" aria-label="man" className="text-6xl mb-2">👨‍🦰</span>
            <span className="text-2xl font-bold">남자 이상형 찾기</span>
          </button>
          <button 
            onClick={() => router.push({ pathname: router.pathname, query: { gender: 'female' } })} 
            className="flex flex-col items-center p-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span role="img" aria-label="woman" className="text-6xl mb-2">👩‍🦰</span>
            <span className="text-2xl font-bold">여자 이상형 찾기</span>
          </button>
        </div>
      </main>
    );
  }

  // 현재 질문 데이터 가져오기
  const currentQuestion = questionsToDisplay[currentQuestionIndex];

  // 질문 페이지 UI
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </h1>
        <div className="options-container space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <label 
              key={option.value} // 고유한 값으로 key 설정
              className={`block p-4 rounded-xl cursor-pointer transition-all duration-200 
                ${selectedOptionForCurrentQuestion === option.value 
                  ? 'bg-blue-200 border-2 border-blue-500 shadow-md text-blue-800 font-semibold' 
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'}`
              }
            >
              <input
                type="radio"
                name="currentQuestion" // 같은 name으로 그룹화하여 질문당 하나만 선택 가능
                value={option.value} // AI 프롬프트 키워드로 사용될 값
                checked={selectedOptionForCurrentQuestion === option.value}
                onChange={handleOptionChange}
                className="mr-3 transform scale-125 accent-blue-500" // 라디오 버튼 스타일링
              />
              <span className="text-lg">{option.text}</span>
            </label>
          ))}
        </div>
        <button 
          onClick={handleNextQuestion} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {currentQuestionIndex < questionsToDisplay.length - 1 ? '다음 질문' : '결과 보기'}
        </button>
      </div>
    </main>
  );
}