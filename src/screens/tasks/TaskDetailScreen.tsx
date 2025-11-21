import React, { useCallback, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../components/shared/Button';
import T from '../../services/localization';
import { useErrorLogger } from '../../hooks/useErrorLogger';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required(T.t('required')),
  description: Yup.string().min(10, 'Description must be at least 10 characters.'),
});

const TaskDetailScreen = ({ navigation, route }) => {
  const { logServerError } = useErrorLogger();
  const taskId = route.params?.taskId;
  const isEditing = !!taskId;

  const handleSave = useCallback(async (values) => {
    try {
      // Simulate API call and error handling
      const mockStatus = isEditing ? 200 : 201;

      // Simulate a 5xx server error for a specific title
      if (values.title.toLowerCase().includes('500')) {
        throw { status: 500, message: 'Internal Server Error Mock' };
      }
      
      // Simulate successful save...
      
      if (mockStatus >= 500) {
        throw new Error('Server failure');
      }

      // 4. Navigation: Demonstrate navigation methods
      if (!isEditing) {
        // On task creation, use replace to prevent going back to an empty form
        navigation.replace('Tasks'); 
      } else {
        // On edit, use goBack
        navigation.goBack(); 
      }
    } catch (error: any) {
      if (error.status && error.status >= 500) {
        // 11. Error handling: Navigate to error page on 5xx
        logServerError(error);
        navigation.replace('ServerError'); 
      } else {
        console.error('FE/BE Validation Error:', error.message);
        // Formik setFieldError logic would go here
      }
    }
  }, [navigation, isEditing, logServerError]);

  const formik = useFormik({
    initialValues: { title: isEditing ? 'Existing Task' : '', description: '' },
    validationSchema: useMemo(() => TaskSchema, []), // 3. React Native: useMemo
    onSubmit: handleSave,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit' : 'New'} Task</Text>
      {/* Form inputs... */}
      <Button title={T.t('save')} onPress={formik.handleSubmit} />
      {isEditing && (
        // 4. Navigation: Demonstrate goBack for cancelling edit
        <Button title="Delete Task" variant="secondary" onPress={() => navigation.goBack()} /> 
      )}
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 20, marginBottom: 20 } });

export default TaskDetailScreen;