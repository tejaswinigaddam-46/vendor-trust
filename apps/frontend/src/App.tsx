import { useEffect, useState } from 'react';
import axios from 'axios';

interface HealthResponse {
  success: boolean;
  message: string;
}

function App() {
  const [message, setMessage] = useState('Connecting...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<HealthResponse>(
        `${import.meta.env.VITE_API_URL}/api/health`
      )
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch(() => {
        setMessage('Backend connection failed');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1>VendorTrust</h1>
      <p>
        {loading ? 'Connecting...' : message}
      </p>
    </div>
  );
}

export default App;
