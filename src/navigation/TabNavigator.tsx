import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, Text, StyleSheet } from 'react-native';
import { TasksStack } from './StackNavigator';
import SignInScreen from '../screens/auth/SignInScreen';
import ErrorsScreen from '../screens/errors/ErrorsScreen';
import { useAuth } from '../hooks/useAuth';
import T from '../services/localization';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { isAuthenticated, role, signOut } = useAuth();
  const isAdmin = role === 'ROLE_ADMIN';

  // 4. Navigation: Conditional Tabs based on auth state
  if (!isAuthenticated) {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {/* Only 1 tab when logged out - Sign in */}
        <Tab.Screen name="SignInTab" component={SignInScreen} options={{ title: T.t('signIn') }} />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="TasksStack" component={TasksStack} options={{ title: T.t('tasks') }} />
      
      {/* 4. Navigation: Route Guard (Restrict access to authenticated/admin users) */}
      {/* Errors tab available only to admin users */}
      {isAdmin && (
        <Tab.Screen name="Errors" component={ErrorsScreen} options={{ title: T.t('errors') }} />
      )}
      
      {/* Sign Out tab implementation */}
      <Tab.Screen
        name="SignOutTab"
        component={() => null}
        options={{
          title: T.t('signOut'),
          // Custom TabBarButton to execute signOut action
          tabBarButton: (props) => (
            <Pressable {...props} onPress={signOut} style={styles.signOutButton}>
              <Text style={styles.signOutText}>{T.t('signOut')}</Text>
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 12,
    color: 'red',
  }
});