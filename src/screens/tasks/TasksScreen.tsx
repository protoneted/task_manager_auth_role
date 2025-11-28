import React, { useMemo, useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTaskContext } from "../../hooks/useTaskContext";
import { Button } from "../../components/shared/Button";
import T from "../../services/localization";

const PAGE_SIZE = 5;

const TasksScreen = ({ navigation }) => {
  const { tasks, filterState } = useTaskContext();
  const [currentPage, setCurrentPage] = useState(1);

  useFocusEffect(
    useCallback(() => {
      console.log("TasksScreen focused - Refreshing...");
      return () => console.log("TasksScreen blurred.");
    }, [])
  );

  // Pagination logic
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return tasks.slice(start, start + PAGE_SIZE);
  }, [tasks, currentPage]);

  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);

  // Navigate to Add Task
  const navigateToAddTask = () => {
    navigation.navigate("TaskDetail", { taskId: undefined });
  };

  // Navigate to Task Detail
  const openTaskDetail = (taskId) => {
    navigation.push("TaskDetail", { taskId });
  };

  // Pagination buttons
  const goNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const goPrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {T.t("taskList")} ({tasks.length})
      </Text>

      <View style={styles.filterBox}>
        <Text style={styles.filterText}>
          Filter: {filterState.status} | Sort: {filterState.sortBy}
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={paginatedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openTaskDetail(item.id)}>
            <Text style={styles.taskItem}>
              {item.title} ({item.isCompleted ? "✔ Done" : "⏳ Pending"})
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{T.t("noTasksFound")}</Text>
        }
      />

      {/* Add Task */}
      <Button title={T.t("addTask")} onPress={navigateToAddTask} />

      {/* Pagination UI */}
      <View style={styles.pagination}>
        <Button title="Prev" onPress={goPrev} disabled={currentPage === 1} />
        <Text style={styles.pageText}>
          {currentPage} / {totalPages}
        </Text>
        <Button title="Next" onPress={goNext} disabled={currentPage === totalPages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "600", marginBottom: 15 },
  filterBox: { paddingVertical: 8 },
  filterText: { color: "#333" },
  taskItem: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  emptyText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
  pagination: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageText: { fontSize: 16, fontWeight: "500" },
});

export default TasksScreen;
