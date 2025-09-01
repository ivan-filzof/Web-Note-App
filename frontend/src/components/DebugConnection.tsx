import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService } from '@/services';

export const DebugConnection = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testDirectFetch = async () => {
    setLoading(true);
    setStatus('Testing direct fetch...');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      setStatus(`Direct fetch: Status ${response.status} - ${response.statusText}`);
    } catch (error) {
      setStatus(`Direct fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testAxiosService = async () => {
    setLoading(true);
    setStatus('Testing axios service...');
    
    try {
      // Test a simple GET request
      const response = await apiService.api.get('/user');
      setStatus(`Axios service: Status ${response.status} - Success`);
    } catch (error: any) {
      setStatus(`Axios service error: ${error.message}`);
      console.error('Axios error details:', error);
    } finally {
      setLoading(false);
    }
  };

  const testLoginEndpoint = async () => {
    setLoading(true);
    setStatus('Testing login endpoint...');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        }),
      });
      
      const data = await response.text();
      setStatus(`Login endpoint: Status ${response.status} - Response: ${data}`);
    } catch (error) {
      setStatus(`Login endpoint error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Debug Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button 
            onClick={testDirectFetch} 
            disabled={loading}
            className="w-full"
            variant="outline"
          >
            Test Direct Fetch
          </Button>
          
          <Button 
            onClick={testAxiosService} 
            disabled={loading}
            className="w-full"
            variant="outline"
          >
            Test Axios Service
          </Button>

          <Button 
            onClick={testLoginEndpoint} 
            disabled={loading}
            className="w-full"
            variant="outline"
          >
            Test Login Endpoint
          </Button>
        </div>
        
        {status && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-mono">{status}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
