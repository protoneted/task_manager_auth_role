import { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoggedError {
  id: string;
  message: string;
  timestamp: number;
}

export const useErrorLogger = () => {
  const [loggedErrors, setLoggedErrors] = useState<LoggedError[]>([]);

  // Load errors on startup
  useEffect(() => {
    const loadErrors = async () => {
      const storedErrors = await AsyncStorage.getItem('app_errors');
      if (storedErrors) {
        setLoggedErrors(JSON.parse(storedErrors));
      }
    };
    loadErrors();
  }, []);

  // 11. Error handling: Call a hook and log the error message
  const logServerError = useCallback(async (error: any) => {
    const newError: LoggedError = {
      id: Date.now().toString(),
      message: error.message || 'Unknown Server Error',
      timestamp: Date.now(),
    };
    
    setLoggedErrors(prev => {
      const updated = [newError, ...prev];
      // Persist the updated list
      AsyncStorage.setItem('app_errors', JSON.stringify(updated));
      return updated;
    });
  }, []);
  
  return { loggedErrors, logServerError };
};