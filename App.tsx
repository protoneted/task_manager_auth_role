import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// WARNING: ALL import paths have been updated to include './src/'
import { AuthProvider } from './src/contexts/AuthContext';
import { TaskProvider } from './src/contexts/TaskContext';
import { TabNavigator } from './src/navigation/TabNavigator';

// The application's main component, containing all providers.
const App = () => {
    return (
        <SafeAreaProvider>
            {/* 6. Authentication & Security: AuthProvider */}
            <AuthProvider>
                {/* 10. Architecture: TaskProvider (for CRUD/State) */}
                <TaskProvider>
                    {/* 4. Navigation: React Navigation container */}
                    <NavigationContainer>
                        {/* TabNavigator contains conditional Stack/Tabs logic */}
                        <TabNavigator />
                    </NavigationContainer>
                </TaskProvider>
            </AuthProvider>
            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
};

export default App;