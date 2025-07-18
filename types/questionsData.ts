// types/questionsData.ts

export interface Option {
  text: string; // 사용자에게 보여줄 선택지 텍스트 (한국어)
  value: string; // AI 프롬프트에 사용될 영어 키워드
}

export interface Question {
  id: string; // 질문의 고유 ID (예: "firstImpression")
  question: string; // 사용자에게 보여줄 질문 텍스트 (한국어)
  options: Option[]; // 선택지 배열
}

export const maleQuestions: Question[] = [
  {
    id: "firstImpression",
    question: "1. 가장 끌리는 첫인상",
    options: [
      { text: "다정하고 웃는 인상", value: "friendly smile, warm expression" },
      { text: "시크하고 무심한 인상", value: "cool, indifferent expression, chic" },
      { text: "강한 카리스마 인상", value: "strong charismatic aura, powerful look" },
      { text: "귀엽고 순한 인상", value: "cute, innocent, gentle expression" },
      { text: "밝고 유쾌한 인상", value: "bright, cheerful, joyful expression" },
    ],
  },
  {
    id: "eyeShape",
    question: "2. 선호하는 눈매",
    options: [
      { text: "날카롭고 강렬한 눈", value: "sharp, intense eyes" },
      { text: "맑고 순한 눈", value: "clear, gentle eyes" },
      { text: "크고 동그란 눈", value: "large, round eyes" },
      { text: "작고 나른한 눈", value: "small, sleepy eyes" },
    ],
  },
  {
    id: "skinColor",
    question: "3. 선호하는 피부색",
    options: [
      { text: "밝고 뽀얀 피부", value: "fair, pale skin" },
      { text: "적당히 하얀 피부", value: "light skin tone" },
      { text: "자연스러운 중간색 피부", value: "natural medium skin tone" },
      { text: "구릿빛 피부", value: "tanned, bronzed skin" },
      { text: "짙고 어두운 피부", value: "dark skin tone" },
    ],
  },
  {
    id: "faceShape",
    question: "4. 선호하는 얼굴형",
    options: [
      { text: "각진형 얼굴", value: "angular face shape, strong jawline" },
      { text: "계란형 얼굴", value: "oval face shape" },
      { text: "가로형 얼굴", value: "wide face shape" },
      { text: "세로형 얼굴", value: "long face shape" },
      { text: "하트형 얼굴", value: "heart face shape" },
    ],
  },
  {
    id: "hairStyle",
    question: "5. 선호하는 헤어스타일",
    options: [
      { text: "단정한 덮은 머리", value: "neat bowl cut hair" },
      { text: "깔끔한 올백 머리", value: "slicked back hair" },
      { text: "스포츠형 짧은 머리", value: "short sport cut hair" },
      { text: "파마형 곱슬 머리", value: "curly perm hair" },
      { text: "가르마 머리", value: "parted hair" },
    ],
  },
  {
    id: "atmosphere",
    question: "6. 선호하는 분위기",
    options: [
      { text: "예술적이고 개성 있는 분위기", value: "artistic, unique, creative atmosphere" },
      { text: "순수하고 착한 분위기", value: "pure, kind, innocent atmosphere" },
      { text: "시크하고 지적인 분위기", value: "chic, intelligent, sophisticated atmosphere" },
      { text: "다정하고 따뜻한 분위기", value: "kind, warm, gentle atmosphere" },
      { text: "야성미 있고 강한 분위기", value: "wild, strong, masculine atmosphere" },
    ],
  },
  {
    id: "doubleEyelids",
    question: "7. 선호하는 쌍커풀",
    options: [
      { text: "유쌍", value: "visible double eyelids" },
      { text: "겉쌍", value: "outer double eyelids" },
      { text: "속쌍", value: "inner double eyelids" },
      { text: "무쌍", value: "monolid eyes" },
    ],
  },
  {
    id: "noseShape",
    question: "8. 선호하는 코 형태",
    options: [
      { text: "높고 각진 코", value: "high, angular nose" },
      { text: "작고 낮은 코", value: "small, low nose" },
      { text: "크고 뭉툭한 코", value: "large, bulbous nose" },
    ],
  },
  {
    id: "lipShape",
    question: "9. 선호하는 입술 형태",
    options: [
      { text: "얇고 직선적인 입술", value: "thin, straight lips" },
      { text: "입꼬리 올라간 입술", value: "upturned lip corners" },
      { text: "도톰하고 선명한 입술", value: "plump, defined lips" },
      { text: "평범하고 자연스러운 입술", value: "normal, natural lips" },
    ],
  },
  {
    id: "eyebrowShape",
    question: "10. 선호하는 눈썹 형태",
    options: [
      { text: "두껍고 짙은 눈썹", value: "thick, dark eyebrows" },
      { text: "얇고 긴 눈썹", value: "thin, long eyebrows" },
      { text: "부드러운 아치형 눈썹", value: "soft, arched eyebrows" },
      { text: "자연스러운 중간 두께 눈썹", value: "natural medium thickness eyebrows" },
    ],
  },
  {
    id: "eyeColor",
    question: "11. 선호하는 눈동자 색",
    options: [
      { text: "회색 눈동자", value: "grey eyes" },
      { text: "진한 갈색 눈동자", value: "dark brown eyes" },
      { text: "푸른기 도는 눈동자", value: "blueish eyes" },
      { text: "밝은 갈색 눈동자", value: "light brown eyes" },
    ],
  },
  {
    id: "earShape",
    question: "12. 선호하는 귀 형태",
    options: [
      { text: "작고 동그란 귀", value: "small, round ears" },
      { text: "뾰족하고 튀어나온 귀", value: "pointed, protruding ears" },
      { text: "크고 뚜렷한 귀", value: "large, defined ears" },
      { text: "평범하고 자연스러운 귀", value: "normal, natural ears" },
    ],
  },
  {
    id: "hairColor",
    question: "13. 선호하는 머리 색",
    options: [
      { text: "검은색 머리", value: "black hair" },
      { text: "갈색 머리", value: "brown hair" },
      { text: "회색 머리", value: "grey hair" },
      { text: "흰색 머리", value: "white hair" },
      { text: "노란색 머리", value: "blonde hair" },
    ],
  },
  {
    id: "expression",
    question: "14. 선호하는 표정",
    options: [
      { text: "활짝 웃는 표정", value: "wide smiling expression" },
      { text: "무표정 표정", value: "neutral expression, poker face" },
      { text: "작은 미소", value: "slight smile" },
      { text: "수줍은 표정", value: "shy expression" },
      { text: "냉철한 표정", value: "calm, cool, sharp expression" },
    ],
  },
  {
    id: "personality",
    question: "15. 선호하는 성격",
    options: [
      { text: "배려심 있고 상냥한 성격", value: "considerate, gentle personality" },
      { text: "감성적이고 표현력 있는 성격", value: "emotional, expressive personality" },
      { text: "차분하고 지적인 성격", value: "calm, intellectual personality" },
      { text: "외향적이고 털털한 성격", value: "outgoing, easygoing personality" },
      { text: "내향적이고 진중한 성격", value: "introverted, serious personality" },
    ],
  },
  {
    id: "animalType",
    question: "16. 선호하는 동물상",
    options: [
      { text: "강아지상", value: "dog-like facial features, friendly, loyal look" },
      { text: "고양이상", value: "cat-like facial features, elegant, sharp look" },
      { text: "곰상", value: "bear-like facial features, strong, dependable look" },
      { text: "늑대상", value: "wolf-like facial features, intense, mysterious look" },
      { text: "여우상", value: "fox-like facial features, cunning, charming look" },
    ],
  },
  {
    id: "skinTonePalette",
    question: "17. 선호하는 피부톤",
    options: [
      { text: "봄 웜톤", value: "spring warm skin tone" },
      { text: "여름 쿨톤", value: "summer cool skin tone" },
      { text: "가을 웜톤", value: "autumn warm skin tone" },
      { text: "겨울 쿨톤", value: "winter cool skin tone" },
    ],
  },
  {
    id: "glasses",
    question: "18. 선호하는 안경 형태",
    options: [
      { text: "안경 없음", value: "no glasses" },
      { text: "투명테 안경", value: "clear frame glasses" },
      { text: "뿔테 안경", value: "horn-rimmed glasses" },
      { text: "둥근 메탈테 안경", value: "round metal frame glasses" },
      { text: "반뿔테 안경", value: "half-rim glasses" },
    ],
  },
  {
    id: "accessories",
    question: "19. 선호하는 악세서리",
    options: [
      { text: "악세서리 없음", value: "no accessories" },
      { text: "귀걸이", value: "wearing earrings" },
      { text: "피어싱", value: "wearing piercings" },
      { text: "목걸이", value: "wearing a necklace" },
    ],
  },
  {
    id: "ageRange",
    question: "20. 선호하는 나이대",
    options: [
      { text: "10대 후반", value: "late teens" },
      { text: "20대 초반", value: "early twenties" },
      { text: "20대 후반", value: "late twenties" },
      { text: "30대", value: "thirties" },
      { text: "40대", value: "forties" },
    ],
  },
];

export const femaleQuestions: Question[] = [
  {
    id: "firstImpression",
    question: "1. 가장 끌리는 첫인상",
    options: [
      { text: "다정하고 웃는 인상", value: "friendly smile, warm expression" },
      { text: "시크하고 무심한 인상", value: "cool, indifferent expression, chic" },
      { text: "강한 카리스마 인상", value: "strong charismatic aura, powerful look" },
      { text: "귀엽고 순수한 인상", value: "cute, innocent, pure expression" },
      { text: "밝고 유쾌한 인상", value: "bright, cheerful, joyful expression" },
    ],
  },
  {
    id: "eyeShape",
    question: "2. 선호하는 눈매",
    options: [
      { text: "날카롭고 강렬한 눈", value: "sharp, intense eyes" },
      { text: "맑고 순한 눈", value: "clear, gentle eyes" },
      { text: "크고 동그란 눈", value: "large, round eyes" },
      { text: "작고 나른한 눈", value: "small, sleepy eyes" },
    ],
  },
  {
    id: "skinColor",
    question: "3. 선호하는 피부색",
    options: [
      { text: "밝고 뽀얀 피부", value: "fair, pale skin" },
      { text: "적당히 하얀 피부", value: "light skin tone" },
      { text: "자연스러운 중간색 피부", value: "natural medium skin tone" },
      { text: "구릿빛 피부", value: "tanned, bronzed skin" },
      { text: "짙고 어두운 피부", value: "dark skin tone" },
    ],
  },
  {
    id: "faceShape",
    question: "4. 선호하는 얼굴형",
    options: [
      { text: "각진형 얼굴", value: "angular face shape, strong jawline" },
      { text: "계란형 얼굴", value: "oval face shape" },
      { text: "가로형 얼굴", value: "wide face shape" },
      { text: "세로형 얼굴", value: "long face shape" },
      { text: "하트형 얼굴", value: "heart face shape" },
    ],
  },
  {
    id: "hairStyle",
    question: "5. 선호하는 헤어스타일",
    options: [
      { text: "장발 웨이브", value: "long wavy hair" },
      { text: "장발 스트레이트", value: "long straight hair" },
      { text: "단발 웨이브", value: "short wavy hair" },
      { text: "단발 스트레이트", value: "short straight hair" },
      { text: "묶은 머리", value: "tied up hair" },
    ],
  },
  {
    id: "atmosphere",
    question: "6. 선호하는 분위기",
    options: [
      { text: "맑고 청순한 분위기", value: "clear, innocent, pure atmosphere" },
      { text: "귀엽고 발랄한 분위기", value: "cute, lively, playful atmosphere" },
      { text: "도도하고 우아한 분위기", value: "haughty, elegant, graceful atmosphere" },
      { text: "차분하고 지적인 분위기", value: "calm, intellectual, sophisticated atmosphere" },
      { text: "예술적이고 개성 있는 분위기", value: "artistic, unique, creative atmosphere" },
    ],
  },
  {
    id: "doubleEyelids",
    question: "7. 선호하는 쌍커풀",
    options: [
      { text: "유쌍", value: "visible double eyelids" },
      { text: "겉쌍", value: "outer double eyelids" },
      { text: "속쌍", value: "inner double eyelids" },
      { text: "무쌍", value: "monolid eyes" },
    ],
  },
  {
    id: "noseShape",
    question: "8. 선호하는 코 형태",
    options: [
      { text: "높고 각진 코", value: "high, angular nose" },
      { text: "작고 낮은 코", value: "small, low nose" },
      { text: "크고 뭉툭한 코", value: "large, bulbous nose" },
    ],
  },
  {
    id: "lipShape",
    question: "9. 선호하는 입술 형태",
    options: [
      { text: "얇고 직선적인 입술", value: "thin, straight lips" },
      { text: "입꼬리 올라간 입술", value: "upturned lip corners" },
      { text: "도톰하고 선명한 입술", value: "plump, defined lips" },
      { text: "평범하고 자연스러운 입술", value: "normal, natural lips" },
    ],
  },
  {
    id: "eyebrowShape",
    question: "10. 선호하는 눈썹 형태",
    options: [
      { text: "두껍고 짙은 눈썹", value: "thick, dark eyebrows" },
      { text: "얇고 긴 눈썹", value: "thin, long eyebrows" },
      { text: "부드러운 아치형 눈썹", value: "soft, arched eyebrows" },
      { text: "자연스러운 중간 두께의 눈썹", value: "natural medium thickness eyebrows" },
    ],
  },
  {
    id: "eyeColor",
    question: "11. 선호하는 눈동자 색",
    options: [
      { text: "회색 눈동자", value: "grey eyes" },
      { text: "진한 갈색 눈동자", value: "dark brown eyes" },
      { text: "푸른기 도는 눈동자", value: "blueish eyes" },
      { text: "밝은 갈색 눈동자", value: "light brown eyes" },
      { text: "검은색 눈동자", value: "black eyes" },
    ],
  },
  {
    id: "earShape",
    question: "12. 선호하는 귀 형태",
    options: [
      { text: "작고 동그란 귀", value: "small, round ears" },
      { text: "뾰족하고 튀어나온 귀", value: "pointed, protruding ears" },
      { text: "크고 뚜렷한 귀", value: "large, defined ears" },
      { text: "평범하고 자연스러운", value: "normal, natural ears" },
    ],
  },
  {
    id: "hairColor",
    question: "13. 선호하는 머리 색",
    options: [
      { text: "검은색 머리", value: "black hair" },
      { text: "갈색 머리", value: "brown hair" },
      { text: "회색 머리", value: "grey hair" },
      { text: "흰색 머리", value: "white hair" },
      { text: "노란색 머리", value: "blonde hair" },
    ],
  },
  {
    id: "expression",
    question: "14. 선호하는 표정",
    options: [
      { text: "활짝 웃는 표정", value: "wide smiling expression" },
      { text: "무표정", value: "neutral expression, poker face" },
      { text: "작은 미소", value: "slight smile" },
      { text: "수줍은 표정", value: "shy expression" },
      { text: "냉철한 표정", value: "calm, cool, sharp expression" },
    ],
  },
  {
    id: "personality",
    question: "15. 선호하는 성격",
    options: [
      { text: "배려심 있고 상냥한 성격", value: "considerate, gentle personality" },
      { text: "감성적이고 표현력 있는 성격", value: "emotional, expressive personality" },
      { text: "차분하고 지적인 성격", value: "calm, intellectual personality" },
      { text: "외향적이고 털털한 성격", value: "outgoing, easygoing personality" },
      { text: "내향적이고 진중한 성격", value: "introverted, serious personality" },
    ],
  },
  {
    id: "animalType",
    question: "16. 선호하는 동물상",
    options: [
      { text: "강아지상", value: "dog-like facial features, friendly, loyal look" },
      { text: "고양이상", value: "cat-like facial features, elegant, sharp look" },
      { text: "토끼상", value: "rabbit-like facial features, innocent, cute look" },
      { text: "사슴상", value: "deer-like facial features, graceful, elegant look" },
      { text: "여우상", value: "fox-like facial features, cunning, charming look" },
    ],
  },
  {
    id: "skinTonePalette",
    question: "17. 선호하는 피부톤",
    options: [
      { text: "봄 웜톤", value: "spring warm skin tone" },
      { text: "여름 쿨톤", value: "summer cool skin tone" },
      { text: "가을 웜톤", value: "autumn warm skin tone" },
      { text: "겨울 쿨톤", value: "winter cool skin tone" },
    ],
  },
  {
    id: "glasses",
    question: "18. 선호하는 안경 형태",
    options: [
      { text: "안경 없음", value: "no glasses" },
      { text: "투명테 안경", value: "clear frame glasses" },
      { text: "뿔테 안경", value: "horn-rimmed glasses" },
      { text: "둥근 메탈테 안경", value: "round metal frame glasses" },
      { text: "반뿔테 안경", value: "half-rim glasses" },
    ],
  },
  {
    id: "accessories",
    question: "19. 선호하는 악세서리",
    options: [
      { text: "악세서리 없음", value: "no accessories" },
      { text: "귀걸이", value: "wearing earrings" },
      { text: "피어싱", value: "wearing piercings" },
      { text: "목걸이", value: "wearing a necklace" },
    ],
  },
  {
    id: "ageRange",
    question: "20. 선호하는 나이대",
    options: [
      { text: "10대 후반", value: "late teens" },
      { text: "20대 초반", value: "early twenties" },
      { text: "20대 후반", value: "late twenties" },
      { text: "30대", value: "thirties" },
      { text: "40대", value: "forties" },
    ],
  },
];