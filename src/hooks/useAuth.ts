import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook to easily access the authentication state and functions (signIn/signOut).
 * @returns The authentication context value (user, role, isAuthenticated, etc.).
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    // Throws an error if the hook is called outside of the <AuthProvider> component tree.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};