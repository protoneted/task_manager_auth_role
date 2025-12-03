import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import T from '../../services/localization';
import { Button } from '../../components/shared/Button';

const validationSchema = Yup.object().shape({
  username: Yup.string().required(T.t('required')),
  password: Yup.string().required(T.t('required')),
});

const SignInScreen = () => {
  const { signIn } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoginError(null);
      // Mocked BE response for a specific input
      if (values.username.toLowerCase().includes('fail')) {
        // Mock a BE error (can be caught and handled to show a specific error)
        setLoginError('Backend: User account locked.');
        return;
      }
      
      const success = await signIn(values.username);
      if (!success) {
        // Generic failure message (FE error message for specific non-match)
        setLoginError(T.t('loginError'));
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{T.t('welcomeBack')}</Text>
      
      {loginError && <Text style={styles.errorText}>{loginError}</Text>}

      <TextInput
        style={styles.input}
        placeholder={T.t('username')}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        value={formik.values.username}
        autoCapitalize="none"
        accessibilityLabel={T.t('username')}
        accessibilityHint="Enter your username. Try 'admin' or 'member'."
      />
      {/* Display FE validation error message */}
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder={T.t('password')}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        secureTextEntry
        accessibilityLabel={T.t('password')}
      />
      {/* Display FE validation error message */}
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Button title={T.t('signIn')} onPress={formik.handleSubmit} disabled={!formik.isValid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  errorText: { color: 'red', marginBottom: 5, textAlign: 'center' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc',
    padding: 12, 
    marginVertical: 10, 
    borderRadius: 8,
  },
});

export default SignInScreen;