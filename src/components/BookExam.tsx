import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, User, Mail } from 'lucide-react';

interface BookExamProps {
  examType: string;
}

const BookExam: React.FC<BookExamProps> = ({ examType }) => {
  const [formData, setFormData] = useState({
    examDate: '',
    timeSlot: '',
    examType: '',
    candidateName: '',
    emailAddress: ''
  });

  // Update form when examType prop changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      examType: examType === 'practice' ? 'Practice Test' : 'Certification Exam'
    }));
  }, [examType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const getExamTypeOptions = () => {
    if (examType === 'practice') {
      return [
        { value: 'Practice Test - Basic', label: 'Basic Practice Test' },
        { value: 'Practice Test - Intermediate', label: 'Intermediate Practice Test' },
        { value: 'Practice Test - Advanced', label: 'Advanced Practice Test' }
      ];
    } else {
      return [
        { value: 'Certification - Level 1', label: 'Level 1 Certification' },
        { value: 'Certification - Level 2', label: 'Level 2 Certification' },
        { value: 'Certification - Expert', label: 'Expert Certification' }
      ];
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {examType === 'practice' ? 'Book Practice Test' : 'Schedule Certification Exam'}
            </h1>
            <p className="text-lg text-gray-700">
              {examType === 'practice' 
                ? 'Schedule your practice test to prepare for the certification.'
                : 'Book your certification exam to validate your skills.'}
            </p>
          </div>

          <div className="mb-8">
            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Exam Date */}
                  <div className="flex items-center">
                    <Calendar className="text-red-500 mr-2" size={20} />
                    <label htmlFor="examDate" className="text-lg font-medium">
                      Select Exam Date:
                    </label>
                  </div>
                  <input
                    type="date"
                    id="examDate"
                    name="examDate"
                    value={formData.examDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />

                  {/* Time Slot */}
                  <div className="flex items-center">
                    <Clock className="text-red-500 mr-2" size={20} />
                    <label htmlFor="timeSlot" className="text-lg font-medium">
                      Select Time Slot:
                    </label>
                  </div>
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
                    required
                  >
                    <option value="">Select a time slot</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                  </select>

                  {/* Exam Type */}
                  <div className="flex items-center">
                    <FileText className="text-gray-500 mr-2" size={20} />
                    <label htmlFor="examType" className="text-lg font-medium">
                      Select {examType === 'practice' ? 'Practice Test' : 'Certification'} Type:
                    </label>
                  </div>
                  <select
                    id="examType"
                    name="examType"
                    value={formData.examType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
                    required
                  >
                    <option value="">Select an exam type</option>
                    {getExamTypeOptions().map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Candidate Name */}
                  <div className="flex items-center">
                    <User className="text-blue-500 mr-2" size={20} />
                    <label htmlFor="candidateName" className="text-lg font-medium">
                      Candidate Name:
                    </label>
                  </div>
                  <input
                    type="text"
                    id="candidateName"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />

                  {/* Email Address */}
                  <div className="flex items-center">
                    <Mail className="text-gray-400 mr-2" size={20} />
                    <label htmlFor="emailAddress" className="text-lg font-medium">
                      Email Address:
                    </label>
                  </div>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition duration-200"
                    >
                      {examType === 'practice' ? 'Book Practice Test' : 'Schedule Certification Exam'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookExam;