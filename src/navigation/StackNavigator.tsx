import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TasksScreen from '../screens/tasks/TasksScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import ServerErrorScreen from '../screens/errors/ServerErrorScreen';

const Stack = createNativeStackNavigator();

export const TasksStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: 'Back' }}>
      <Stack.Screen 
        name="Tasks" 
        component={TasksScreen} 
        options={{ title: 'Tasks' }}
      />
      <Stack.Screen 
        name="TaskDetail" 
        component={TaskDetailScreen} 
        options={{ title: 'Task Details' }}
      />
      {/* 11. Error handling: Error page route */}
      <Stack.Screen 
        name="ServerError" 
        component={ServerErrorScreen} 
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack.Navigator>
  );
};