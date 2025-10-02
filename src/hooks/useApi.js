import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../utils/constants';

// ============= API HOOK =============
export const useApi = () => {
  const { token, logout } = useAuth();

  const apiCall = async (endpoint, method = 'GET', body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        // Automatically logout if unauthorized (401 error)
        if (response.status === 401) {
            logout();
            throw new Error('Session expired. Please log in again.');
        }
        throw new Error(data.message || 'API Error');
    }

    return data;
  };

  return { apiCall };
};