import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { BookOpen, PenTool, Shield, Zap } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onRegister: (name: string, email: string, password: string) => Promise<boolean>;
  loading: boolean;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister, loading }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex min-h-screen">
        {/* Left Side - Hero */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/68b2b77cc2e3ac763e9fda01_1756542888821_9b003893.webp')`
            }}
          >
            <div className="absolute inset-0 bg-blue-900/20"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6">
                Your thoughts, organized beautifully
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Capture ideas, organize projects, and never lose track of what matters most.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>Rich text editing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span>Secure & private</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span>Lightning fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <PenTool className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {isLogin ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isLogin 
                  ? 'Sign in to access your notes' 
                  : 'Start organizing your thoughts today'
                }
              </p>
            </div>

            {isLogin ? (
              <LoginForm onSubmit={onLogin} loading={loading} />
            ) : (
              <RegisterForm onSubmit={onRegister} loading={loading} />
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium"
                disabled={loading}
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};