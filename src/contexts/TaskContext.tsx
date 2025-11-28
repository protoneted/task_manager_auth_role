import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, TaskFilterState } from "../types/Task";

const FILTER_KEY = "TASK_FILTER_STATE";
const TASKS_KEY = "TASK_LIST";

const initialFilter: TaskFilterState = {
  status: "all",          // all | pending | completed
  sortBy: "createdAt",    // createdAt | title
  sortDirection: "desc",  // asc | desc
  search: "",
};

export const TaskContext = createContext<any | undefined>(undefined);

export const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterState, setFilterState] = useState<TaskFilterState>(initialFilter);


  //Load persisted tasks & filters on app start

  useEffect(() => {
    (async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
        const savedFilters = await AsyncStorage.getItem(FILTER_KEY);

        if (savedTasks) setTasks(JSON.parse(savedTasks));
        if (savedFilters) setFilterState(JSON.parse(savedFilters));
      } catch (e) {
        console.warn("Error loading saved state", e);
      }
    })();
  }, []);


  //Persist tasks

  const persistTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
    } catch (e) {
      console.warn("Failed to save tasks", e);
    }
  };


  // Persist filters

  useEffect(() => {
    AsyncStorage.setItem(FILTER_KEY, JSON.stringify(filterState)).catch((e) =>
      console.warn("Failed to save filter state", e)
    );
  }, [filterState]);


  // Save or Update Task

  const saveTask = useCallback((task: Task) => {
    setTasks((prev) => {
      const exists = prev.findIndex((t) => t.id === task.id);

      let updated;
      if (exists !== -1) {
        updated = prev.map((t, i) => (i === exists ? task : t));
      } else {
        updated = [...prev, task];
      }

      persistTasks(updated);
      return updated;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
  setTasks((prev) => {
    const updated = prev.filter((t) => t.id !== id);
    persistTasks(updated);
    return updated;
  });
}, []);


  // Filtering + Sorting Logic

  const filteredAndSortedTasks = useMemo(() => {
    let list = [...tasks];

    // SEARCH FILTER
    if (filterState.search.trim() !== "") {
      const q = filterState.search.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }

    // STATUS FILTER
    if (filterState.status === "pending") {
      list = list.filter((t) => !t.isCompleted);
    } else if (filterState.status === "completed") {
      list = list.filter((t) => t.isCompleted);
    }

    // SORTING
    list.sort((a, b) => {
      let valueA = a[filterState.sortBy];
      let valueB = b[filterState.sortBy];

      // For dates (createdAt, updatedAt)
      if (filterState.sortBy.includes("At")) {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (valueA < valueB) return filterState.sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return filterState.sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [tasks, filterState]);


  //Context Value

  const value = useMemo(
    () => ({
      tasks: filteredAndSortedTasks,
      rawTasks: tasks, // optional: for analytics or debugging
      filterState,
      setFilterState,
      saveTask,
      deleteTask,
    }),
    [filteredAndSortedTasks, tasks, filterState, saveTask,deleteTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
