import React, { useState, useEffect } from 'react';
import { PenLine, Calendar, Target, BarChart2 } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Student {
  name: string;
  examDate: string;
  score: number;
}

const QuizApp: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [examResults, setExamResults] = useState<Student[]>([]);

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
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showResults]);

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
    // Calculate the score
    const totalQuestions = questions.length;
    const correctAnswers = Object.entries(answers).reduce((acc, [questionIndex, answer]) => {
      const question = questions[parseInt(questionIndex)];
      return acc + (answer === question.correctAnswer ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Create mock results
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newResults: Student[] = [
      { name: "John Doe", examDate: currentDate, score: 85 },
      { name: "Jane Smith", examDate: currentDate, score: 72 },
      { name: "Mike Johnson", examDate: currentDate, score: 45 },
      { name: "Current User", examDate: currentDate, score: score }
    ];

    setExamResults(newResults);
    setShowResults(true);
  };

  const handleStartNewExam = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setTimeLeft(1800);
    setSelectedAnswer(null);
    setAnswers({});
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center gap-2">
            <PenLine className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold">Exam Results</h1>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-white">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <PenLine className="w-5 h-5 text-blue-500" />
                      <span>Student Name</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span>Exam Date</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      <span>Score</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-5 h-5 text-blue-500" />
                      <span>Pass/Fail</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {examResults.map((student, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      {student.examDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      {student.score}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.score >= 50 ? (
                        <div className="flex items-center gap-1">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100">
                            <span className="text-green-600 text-xl">✓</span>
                          </span>
                          <span className="text-lg">Pass</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100">
                            <span className="text-red-600 text-xl">✕</span>
                          </span>
                          <span className="text-lg">Fail</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex gap-4">
            <button 
              onClick={handleStartNewExam}
              className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              Start New Exam
            </button>
            <button 
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors text-lg font-medium"
            >
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit Exam
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
