import React, { createContext, useState, useCallback, useMemo } from 'react';
import { Task, TaskFilterState } from '../types/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialFilter: TaskFilterState = {
  status: 'all',
  sortBy: 'createdAt',
  sortDirection: 'desc',
  search: '',
};

export const TaskContext = createContext<any | undefined>(undefined);

export const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // 10. Architecture: Persist the filters + sort state on refresh (using AsyncStorage wrapper in a real app)
  const [filterState, setFilterState] = useState<TaskFilterState>(initialFilter);
  
  // Placeholder CRUD functions...
  const saveTask = useCallback((task: Task) => {
    // ... logic to save to AsyncStorage or API
    setTasks(prev => {
        const existing = prev.findIndex(t => t.id === task.id);
        if (existing !== -1) {
            return prev.map((t, i) => i === existing ? task : t);
        }
        return [...prev, task];
    });
  }, []);

  // useMemo for filtered and sorted tasks logic
  const filteredAndSortedTasks = useMemo(() => {
    // 10. Architecture: Build filters and sorting logic here
    return tasks; // Simplified for blueprint
  }, [tasks, filterState]);

  const value = useMemo(() => ({
    tasks: filteredAndSortedTasks,
    filterState,
    setFilterState,
    saveTask,
  }), [filteredAndSortedTasks, filterState, saveTask]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};