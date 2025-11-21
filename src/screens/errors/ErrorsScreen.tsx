import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useErrorLogger } from '../../hooks/useErrorLogger';
import T from '../../services/localization';

const ErrorsScreen = () => {
  const { role } = useAuth();
  const { loggedErrors } = useErrorLogger();

  // 4. Navigation: Route guard check (though already handled in TabNavigator, redundancy is good)
  if (role !== 'ROLE_ADMIN') {
    return <View style={styles.container}><Text>Access Denied. Admin Only.</Text></View>;
  }
  
  // 11. Error handling: Screen available only to users with ROLE_ADMIN
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{T.t('adminScreen')}</Text>
      <Text>Total Logged Errors: {loggedErrors.length}</Text>
      <FlatList
        data={loggedErrors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.errorItem}>
            <Text style={styles.errorText}>ID: {item.id}</Text>
            <Text style={styles.errorText}>Message: {item.message}</Text>
            <Text style={styles.errorText}>Time: {new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 20 }, 
  title: { fontSize: 24, marginBottom: 20 },
  errorItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  errorText: { fontSize: 14 }
});

export default ErrorsScreen;