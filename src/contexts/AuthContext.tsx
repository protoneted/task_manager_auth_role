import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { User, UserRole } from '../types/User';

// ... AuthContextType definition

export const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Persistence, 6. Persist sessions
  useEffect(() => {
    const loadSession = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const role = user?.role || null;
  const isAuthenticated = !!user;

  // 3. React Native: Use useCallback
  const signIn = useCallback(async (username: string): Promise<boolean> => {
    if (username.toLowerCase() === 'admin' || username.toLowerCase() === 'member') {
      let mockRole: UserRole = username.toLowerCase() === 'admin' ? 'ROLE_ADMIN' : 'ROLE_MEMBER';
      const newUser: User = { id: '1', username, role: mockRole };
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
    return false;
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  }, []);

  // 3. React Native: Use useMemo
  const value = useMemo(() => ({
    user, role, isLoading, signIn, signOut, isAuthenticated
  }), [user, isLoading, signIn, signOut, isAuthenticated]);

  if (isLoading) {
    return null; // Simple loading check
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};