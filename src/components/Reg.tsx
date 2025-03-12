import React, { useState } from 'react';
import { Mail, Lock, User, Shield, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegProps {
  onBackToLogin: () => void;
}

const Reg: React.FC<RegProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    console.log('Registration attempt:', { name, email, password });
    // In a real app, you would handle registration here
    onBackToLogin(); // Navigate back to login after successful registration
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <UserPlus className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to access technical resources and training materials
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Full Name"
                  aria-describedby="name-error"
                  className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border ${name ? 'border-gray-300' : 'border-red-600'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Full Name"
                />
                {name === '' && <p id="name-error" className="text-red-600">Please enter your full name.</p>}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  aria-describedby="email-error"
                  className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border ${email.includes('@') ? 'border-gray-300' : 'border-red-600'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
                {!email.includes('@') && <p id="email-error" className="text-red-600">Please enter a valid email address.</p>}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                  aria-describedby="password-error"
                  className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border ${password.length >= 8 ? 'border-gray-300' : 'border-red-600'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
                {password.length < 8 && <p id="password-error" className="text-red-600">Please enter a password with at least 8 characters.</p>}
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-label="Confirm Password"
                  aria-describedby="confirm-password-error"
                  className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border ${password === confirmPassword ? 'border-gray-300' : 'border-red-600'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Confirm Password"
                />
                {password !== confirmPassword && <p id="confirm-password-error" className="text-red-600">Passwords do not match!</p>}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <button 
              type="button" 
              onClick={onBackToLogin}
              className="font-medium text-blue-600 hover:text-blue-500 border-none bg-transparent"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reg;