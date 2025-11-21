import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { TabNavigator } from './navigation/TabNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TaskProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </TaskProvider>
      </AuthProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;