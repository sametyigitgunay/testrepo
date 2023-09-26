import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

import userDataJson from './db.json';

const App = () => {
  const [userData, setUserData] = useState(userDataJson.users);

  useEffect(() => {
  }, []);

  if (!userData) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ backgroundColor: 'gray', paddingTop: 10, paddingBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
            Anasayfa
          </Text>
        </View>
      <FlatList
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.cardText}>Kullanıcı Adı: {item.name}</Text>
            <Text style={styles.cardText}>Yaş: {item.age}</Text>
            <Text style={styles.cardText}>E-posta: {item.email}</Text>
            <Text style={styles.cardText}>Çalışma Deneyimi: {item['working experience']} yıl</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  userCard: {
    borderWidth: 2,
    borderColor: 'gray',
    padding: 15,
    marginVertical: 15,
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
});