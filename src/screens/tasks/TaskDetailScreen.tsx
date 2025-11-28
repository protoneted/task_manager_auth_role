import React, { useCallback, useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  Switch, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../components/shared/Button';
import T from '../../services/localization';
import { useErrorLogger } from '../../hooks/useErrorLogger';
import { useTaskContext } from '../../hooks/useTaskContext';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required(T.t('required')),
  description: Yup.string().min(10, 'Description must be at least 10 characters.'),
});

const TaskDetailScreen = ({ navigation, route }) => {
  const { logServerError } = useErrorLogger();
  const { saveTask, rawTasks, deleteTask } = useTaskContext();

  const taskId = route.params?.taskId;
  const isEditing = !!taskId;

  const existingTask = useMemo(
    () => (isEditing ? rawTasks.find((t) => t.id === taskId) : undefined),
    [rawTasks, isEditing, taskId]
  );

  const [isCompleted, setIsCompleted] = useState(
    existingTask ? existingTask.isCompleted : false
  );

  const initialValues = useMemo(
    () => ({
      title: existingTask?.title ?? '',
      description: existingTask?.description ?? '',
    }),
    [existingTask]
  );

  const handleSave = useCallback(
    async (values) => {
      try {
        if (values.title.toLowerCase().includes('500')) {
          throw { status: 500, message: 'Internal Server Error Mock' };
        }

        const taskToSave = {
          id: isEditing ? taskId : Date.now().toString(),
          title: values.title,
          description: values.description,
          createdAt: isEditing ? existingTask?.createdAt ?? new Date().toISOString() : new Date().toISOString(),
          isCompleted: isCompleted, // ✅ UPDATED: Use the local state value
        };

        saveTask(taskToSave);

        if (!isEditing) {
          navigation.replace('Tasks');
        } else {
          navigation.goBack();
        }
      } catch (error) {
        if (error?.status && error.status >= 500) {
          logServerError(error);
          navigation.replace('ServerError');
        } else {
          console.error('Validation / Save Error:', error?.message ?? error);
          Alert.alert('Error', error?.message ?? 'Unable to save task');
        }
      }
    },
    [isEditing, taskId, existingTask, isCompleted, saveTask, navigation, logServerError]
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: TaskSchema,
    onSubmit: handleSave,
  });

  //Delete Confirmation Logic
const handleDelete = () => {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm(T.t('confirmDeleteMsg'));
    if (confirmed) {
      deleteTask(taskId);
      navigation.goBack();
    }
    return;
  }

  // For iOS & Android
  Alert.alert(
    T.t('confirmDeleteTitle'), 
    T.t('confirmDeleteMsg'),
    [
      { text: T.t('cancel'), style: 'cancel' },
      {
        text: T.t('yesDelete'),
        style: 'destructive',
        onPress: () => {
          deleteTask(taskId);
          navigation.goBack();
        },
      },
    ]
  );
};


  if (isEditing && !existingTask) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found</Text>
        <Text style={styles.info}>This task may have been deleted or is unavailable.</Text>
        <Button title="Back to list" onPress={() => navigation.replace('Tasks')} />
      </View>
    );
  }

  //KeyboardAvoidingView for Platform Specific behavior
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{isEditing ? 'Edit' : 'New'} Task</Text>

          <Text style={styles.label}>{T.t('taskTitle')}</Text>
          <TextInput
            style={styles.input}
            placeholder={T.t('taskTitle')}
            value={formik.values.title}
            onChangeText={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <Text style={styles.errorText}>{formik.errors.title}</Text>
          )}

          <Text style={styles.label}>{T.t('taskDesc')}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={T.t('taskDesc')}
            value={formik.values.description}
            onChangeText={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
            multiline
          />
          {formik.touched.description && formik.errors.description && (
            <Text style={styles.errorText}>{formik.errors.description}</Text>
          )}

          {/*Toggle Switch for Completion */}
          <View style={styles.switchContainer}>
            <Text style={styles.label}>{T.t('markCompleted')}</Text>
            <Switch
              value={isCompleted}
              onValueChange={setIsCompleted}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isCompleted ? "#007bff" : "#f4f3f4"}
            />
          </View>

          <Button title={T.t('save')} onPress={formik.handleSubmit} />

          {isEditing && (
            <Button
              title={T.t('deleteTask')}
              variant="secondary"
              onPress={handleDelete}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 20, fontWeight: '600' },
  label: { fontSize: 14, marginTop: 10, marginBottom: 6, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginTop: 6,
    fontSize: 13,
  },
  info: {
    marginBottom: 20,
    color: '#555',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee'
  }
});

export default TaskDetailScreen;