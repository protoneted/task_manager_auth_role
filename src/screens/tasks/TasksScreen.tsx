import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTaskContext } from '../../hooks/useTaskContext'; // Assumed
import { Button } from '../../components/shared/Button';
import T from '../../services/localization';

const PAGE_SIZE = 5; // 3. React Native: Pagination with 5 items per page

const TasksScreen = ({ navigation }) => {
  const { tasks, filterState } = useTaskContext();
  const [currentPage, setCurrentPage] = React.useState(1);

  // 3. React Native: Use useFocusEffect (e.g., to refresh list on screen focus)
  useFocusEffect(
    React.useCallback(() => {
      // Logic to fetch the latest tasks or reload data
      console.log('TasksScreen focused. Reloading data...');
      // Clean up if necessary
      return () => console.log('TasksScreen blurred.');
    }, [])
  );

  // 10. Architecture: Persist filters + sort state is handled in TaskContext
  
  // Apply pagination
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return tasks.slice(start, end);
  }, [tasks, currentPage]);

  const navigateToAddTask = () => {
    // 4. Navigation: Demonstrate navigate
    navigation.navigate('TaskDetail', { taskId: undefined });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List ({tasks.length})</Text>
      
      {/* 10. Architecture: Filters and Sorting UI Placeholder */}
      <View>
        <Text>Filter State: {filterState.status} - {filterState.sortBy}</Text>
      </View>
      
      <FlatList
        data={paginatedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Navigate to details, using push to ensure a new screen is always added
          <Text onPress={() => navigation.push('TaskDetail', { taskId: item.id })}>
            {item.title} ({item.isCompleted ? 'Done' : 'Pending'})
          </Text>
        )}
      />

      <Button title={T.t('addTask')} onPress={navigateToAddTask} />
      {/* Pagination Controls Placeholder */}
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, header: { fontSize: 20, marginBottom: 10 } });

export default TasksScreen;