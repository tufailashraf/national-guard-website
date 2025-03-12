// import React, { useState, useRef, useEffect } from 'react';
// import { Send, FileText, Bot, User, Loader } from 'lucide-react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// const API_KEY = ""; // Replace with your actual API key

// interface Message {
//   type: 'user' | 'bot';
//   content: string;
//   timestamp: Date;
// }

// async function getMCQsFromAPI(topic: string) {
//   try {
//     const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ "contents": [{ "parts": [{ "text": `Generate 30 MCQs on ${topic}.` }] }] })
//     });
//     const data = await response.json();
//     return data.candidates[0].content.parts[0].text.split('\n').map((q: string, i: number) => {
//       const parts = q.split('?');
//       return {
//         question: `Q${i + 1}: ${parts[0]}?`,
//         answers: parts.slice(1).map((a, index) => `${String.fromCharCode(65 + index)}. ${a}`),
//         correctAnswer: parts[1] // Assuming API provides the correct answer in a structured manner
//       };
//     });
//   } catch (error) {
//     return [];
//   }
// }

// const downloadPDF = (topic: string, mcqs: any[]) => {
//   const doc = new jsPDF();
//   doc.setFont('times', 'bold');
//   doc.setFontSize(18);
//   doc.text(`MCQs Examination Paper`, 105, 15, { align: 'center' });
//   doc.setFontSize(14);
//   doc.text(`Subject: ${topic}`, 15, 30);
//   doc.text(`Total Questions: 30`, 15, 40);
//   doc.text(`Instructions: Select the correct answer from the given options.`, 15, 50);

//   let y = 60;
//   mcqs.forEach((mcq, index) => {
//     doc.setFont('times', 'normal');
//     doc.text(`${index + 1}. ${mcq.question}`, 15, y);
//     y += 7;
//     mcq.answers.forEach((answer: string) => {
//       doc.text(answer, 20, y);
//       y += 6;
//     });
//     y += 4;
//     if (y > 270) {
//       doc.addPage();
//       y = 20;
//     }
//   });

//   doc.save(`${topic.replace(/\s+/g, '_')}_mcqs_paper.pdf`);
// };

// const PaperGen = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [mcqs, setMcqs] = useState<any[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage: Message = { type: 'user', content: input, timestamp: new Date() };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     const generatedMCQs = await getMCQsFromAPI(input);
//     setMcqs(generatedMCQs);

//     const botMessage: Message = {
//       type: 'bot',
//       content: `Generated 30 MCQs for topic: ${input}. Click below to download.`,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, botMessage]);
//     setIsLoading(false);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <div className="bg-white border-b p-4">
//         <div className="max-w-3xl mx-auto flex items-center gap-2">
//           <FileText className="text-blue-600" size={24} />
//           <h1 className="text-xl font-semibold">Paper Generation Assistant</h1>
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <div className="max-w-3xl mx-auto">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex gap-3 mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//               {message.type === 'bot' && (
//                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
//                   <Bot size={20} />
//                 </div>
//               )}
//               <div className={`rounded-lg p-4 max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
//                 <p className="whitespace-pre-wrap">{message.content}</p>
//                 <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
//                   {message.timestamp.toLocaleTimeString()}
//                 </div>
//               </div>
//               {message.type === 'user' && (
//                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                   <User size={20} />
//                 </div>
//               )}
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex gap-3 mb-4">
//               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
//                 <Bot size={20} />
//               </div>
//               <div className="rounded-lg p-4 bg-white border">
//                 <Loader className="animate-spin" size={20} />
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>
//       {mcqs.length > 0 && (
//         <div className="p-4 text-center">
//           <button
//             onClick={() => downloadPDF(input, mcqs)}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           >
//             Download MCQs PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaperGen;


import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Bot, User, Loader } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const API_KEY = "AIzaSyACs27id08grEM8zZ3V44vNfIprnoh9nHs"; // Replace with your actual API key

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

async function getMCQsFromAPI(topic: string) {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "contents": [{ "parts": [{ "text": `Generate 30 MCQs on ${topic}.` }] }] })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text.split('\n').map((q: string, i: number) => {
      const parts = q.split('?');
      return {
        question: `Q${i + 1}: ${parts[0]}?`,
        answers: parts.slice(1).map((a, index) => `${String.fromCharCode(65 + index)}. ${a}`),
        correctAnswer: parts[1] // Assuming API provides the correct answer in a structured manner
      };
    });
  } catch (error) {
    return [];
  }
}

const downloadPDF = (topic: string, mcqs: any[]) => {
  const doc = new jsPDF();
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text(`MCQs Examination Paper`, 105, 15, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`Subject: ${topic}`, 15, 30);
  doc.text(`Total Questions: 30`, 15, 40);
  doc.text(`Instructions: Select the correct answer from the given options.`, 15, 50);

  let y = 60;
  mcqs.forEach((mcq, index) => {
    doc.setFont('times', 'normal');
    doc.text(`${index + 1}. ${mcq.question}`, 15, y);
    y += 7;
    mcq.answers.forEach((answer: string) => {
      doc.text(answer, 20, y);
      y += 6;
    });
    y += 4;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save(`${topic.replace(/\s+/g, '_')}_mcqs_paper.pdf`);
};

const PaperGen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! I can help you generate exam papers. What topic do you want the paper on?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mcqs, setMcqs] = useState<any[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Store user's message
    const userMessage: Message = { type: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    setSelectedTopic(input);
    setInput('');
    setIsLoading(true);

    // Fetch MCQs
    const generatedMCQs = await getMCQsFromAPI(input);
    setMcqs(generatedMCQs);

    // Store bot response
    const botMessage: Message = {
      type: 'bot',
      content: `Generated 30 MCQs for topic: ${input}. Click below to download.`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b mt-[88px] p-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <FileText className="text-blue-600" size={24} />
          <h1 className="text-xl font-semibold">Paper Generation Assistant</h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Bot size={20} />
                </div>
              )}
              <div className={`rounded-lg p-4 max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Bot size={20} />
              </div>
              <div className="rounded-lg p-4 bg-white border">
                <Loader className="animate-spin" size={20} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your topic..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Download MCQ Paper */}
      {mcqs.length > 0 && (
        <div className="p-4 text-center">
          <button onClick={() => downloadPDF(selectedTopic, mcqs)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Download MCQs PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PaperGen;
