import { useState } from 'react';
import { AuthService } from '@/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestConnection = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus('Testing connection...');
    
    try {
      // Test if we can reach the backend
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setStatus('✅ Backend connection successful!');
      } else {
        setStatus(`❌ Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      setStatus(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testAuthService = async () => {
    setLoading(true);
    setStatus('Testing AuthService...');
    
    try {
      const isAuth = AuthService.isAuthenticated();
      setStatus(`✅ AuthService working! Authenticated: ${isAuth}`);
    } catch (error) {
      setStatus(`❌ AuthService error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Test Backend Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button 
            onClick={testConnection} 
            disabled={loading}
            className="w-full"
          >
            Test Backend Connection
          </Button>
          
          <Button 
            onClick={testAuthService} 
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            Test AuthService
          </Button>
        </div>
        
        {status && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">{status}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
