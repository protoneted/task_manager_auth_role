import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import T from '../../services/localization';

const ServerErrorScreen = () => {
  // 11. Error handling: Add an error page (5xx status)
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.title}>{T.t('serverErrorTitle')}</Text>
      <Text style={styles.message}>{T.t('serverErrorMsg')}</Text>
      <Text style={styles.message}>The Admin has been notified.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
  emoji: { fontSize: 60, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: 'red', marginBottom: 10 },
  message: { fontSize: 16, color: '#333', textAlign: 'center', paddingHorizontal: 40 },
});

export default ServerErrorScreen;