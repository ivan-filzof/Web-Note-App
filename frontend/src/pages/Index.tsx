
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthContainer } from '@/components/auth/AuthContainer';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';


const Index: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthContainer />;
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Temporary test component - remove after testing */}
        <div className="p-4">
        </div>
        <AppLayout />
      </div>
    </AppProvider>
  );
};

export default Index;
