import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  UserProfile, 
  getStoredToken, 
  setStoredToken, 
  removeStoredToken, 
  fetchCurrentUser, 
  loginUser, 
  registerUser 
} from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string, displayName: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getStoredToken();
      if (storedToken) {
        const res = await fetchCurrentUser(storedToken);
        if (res.success && res.data) {
          setUser(res.data);
          setToken(storedToken);
        } else {
          removeStoredToken();
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginUser({ email, password });
    if (res.success && res.data) {
      const newToken = res.data.token.access_token;
      setStoredToken(newToken);
      setToken(newToken);
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, message: res.error?.message || 'Login failed' };
  };

  const register = async (email: string, password: string, displayName: string) => {
    const res = await registerUser({ email, password, display_name: displayName });
    if (res.success && res.data) {
      const newToken = res.data.token.access_token;
      setStoredToken(newToken);
      setToken(newToken);
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, message: res.error?.message || 'Registration failed' };
  };

  const logout = () => {
    removeStoredToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
