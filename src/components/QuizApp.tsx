import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizApp: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Sample questions
  const questions: Question[] = [
    {
      id: 1,
      question: "What is voltage?",
      options: [
        "Flow of electrons",
        "Electrical pressure or force",
        "Rate of current flow",
        "Resistance in a circuit"
      ],
      correctAnswer: "Electrical pressure or force"
    },
    {
      id: 2,
      question: "What unit is current measured in?",
      options: [
        "Volts",
        "Watts",
        "Amperes",
        "Ohms"
      ],
      correctAnswer: "Amperes"
    },
    {
      id: 3,
      question: "What is the voltage of a standard AA battery?",
      options: [
        "1.2V",
        "1.5V",
        "9V",
        "3V"
      ],
      correctAnswer: "1.5V"
    },
    // Add more questions as needed
  ];

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the answers to a server
    console.log('Submitted answers:', answers);
    // You can also calculate the score here
    const score = Object.entries(answers).reduce((acc, [questionIndex, answer]) => {
      const question = questions[parseInt(questionIndex)];
      return acc + (answer === question.correctAnswer ? 1 : 0);
    }, 0);
    console.log('Score:', score);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Electrical Engineering Basics
        </h1>

        {/* Timer and Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">⏱ Time Left:</span>
              <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-right">
              {currentQuestion + 1}/{questions.length}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-red-600 h-2.5 rounded-full" 
              style={{ 
                width: `${((currentQuestion + 1) / questions.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="text-sm text-blue-600 mb-2">
            Question #{currentQuestion + 1}
          </div>
          <h2 className="text-xl font-semibold mb-4">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-4 rounded-lg border ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="inline-block w-6">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg ${
              currentQuestion === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={() => handleSubmit()}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit Answer
          </button>

          <button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className={`px-6 py-2 rounded-lg ${
              currentQuestion === questions.length - 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
