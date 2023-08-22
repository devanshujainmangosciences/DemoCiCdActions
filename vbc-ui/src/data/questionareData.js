const QuestionareData = [
  {
    id: 1,
    question:
      'Do you have any trouble doing strenuous activities, like carrying a heavy shopping bag or a suitcase?',
    answerType: 'radio',
    possibleResponse: {
      one: 'Not at all',
      two: 'A little',
      three: 'Quite a bit',
      four: 'Very much',
    },
  },
  {
    id: 2,
    question: 'Do you have any trouble taking a long walk?',
    answerType: 'radio',
    possibleResponse: {
      one: 'Not at all',
      two: 'A little',
      three: 'Quite a bit',
      four: 'Very much',
    },
  },
  {
    id: 3,
    question:
      'Do you have any trouble taking a short walk outside of the house?',
    answerType: 'radio',
    possibleResponse: {
      one: 'Not at all',
      two: 'A little',
      three: 'Quite a bit',
      four: 'Very much',
    },
  },
  {
    id: 4,
    question: 'Do you need to stay in bed or a chair during the day?',
    answerType: 'radio',
    possibleResponse: {
      one: 'Not at all',
      two: 'A little',
      three: 'Quite a bit',
      four: 'Very much',
    },
  },
  {
    id: 5,
    question:
      'Do you need help with eating, dressing, washing yourself or using the toilet?',
    answerType: 'radio',
    possibleResponse: {
      one: 'Not at all',
      two: 'A little',
      three: 'Quite a bit',
      four: 'Very much',
    },
  },
  {
    id: 6,
    question: 'Did pain interfere with your daily activities?',
    answerType: 'rating',
    possibleResponse: {
      options: [1, 2, 3, 4, 5, 6, 7],
    },
  },
  {
    id: 7,
    question:
      'How would you rate your overall quality of life during the past week?',
    answerType: 'rating',
    possibleResponse: {
      options: [1, 2, 3, 4, 5, 6, 7],
    },
  },
];
export default QuestionareData;
