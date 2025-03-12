import React from 'react';
import { Mail, Lock, User, Shield } from 'lucide-react';
import Reg from './Reg';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [formData, setFormData] = React.useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showRegister, setShowRegister] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isAdmin) {
        if (formData.email === 'admin@gmail.com' && formData.password === 'admin@123') {
          onNavigate('admin-dashboard');
        } else {
          throw new Error('Invalid admin credentials');
        }
      } else {
        // Handle regular user login - replace with actual API call
        console.log('Login attempt:', { ...formData, isAdmin });
        onNavigate('home');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed');
    }
  };

  if (showRegister) {
    return <Reg onBackToLogin={() => setShowRegister(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[95%] sm:max-w-md space-y-6 sm:space-y-8 bg-white/80 backdrop-blur-sm p-4 sm:p-8 lg:p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="flex justify-center transform transition-transform hover:scale-110">
            <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-indigo-600" />
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            {isAdmin ? 'Admin Login' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdmin 
              ? 'Enter your credentials to access the admin dashboard' 
              : 'Access your personalized learning experience'}
          </p>
        </div>
        
        <div className="flex justify-center space-x-2 sm:space-x-4 mt-4">
          {[
            { type: 'user', icon: User, label: 'User' },
            { type: 'admin', icon: Shield, label: 'Admin' }
          ].map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => setIsAdmin(type === 'admin')}
              className={`
                px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
                flex items-center gap-1 sm:gap-2 text-sm sm:text-base
                ${type === 'admin' ? isAdmin : !isAdmin
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
              {label}
            </button>
          ))}
        </div>
        
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {[
            {
              id: 'email',
              type: 'email',
              icon: Mail,
              placeholder: 'Email address',
              autoComplete: 'email'
            },
            {
              id: 'password',
              type: 'password',
              icon: Lock,
              placeholder: 'Password',
              autoComplete: 'current-password'
            }
          ].map(({ id, type, icon: Icon, placeholder, autoComplete }) => (
            <div key={id} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id={id}
                name={id}
                type={type}
                autoComplete={autoComplete}
                required
                value={formData[id as keyof LoginFormData]}
                onChange={handleInputChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 sm:py-3 pl-10
                  border border-gray-300 placeholder-gray-500 text-gray-900 text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  focus:z-10 transition-all duration-200"
                placeholder={placeholder}
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4 mt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 sm:py-3 px-4
                border border-transparent text-sm font-medium rounded-lg text-white
                bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isAdmin ? 'Sign in as Admin' : 'Sign in'}
            </button>
            
            {!isAdmin && (
              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account?</span>{' '}
                <button 
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Register now
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
