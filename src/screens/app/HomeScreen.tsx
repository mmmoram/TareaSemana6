import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { ApiService } from '../../services/apiServices';
import { Meal } from '../../types/api';

export const HomeScreen = ({ navigation }: any) => {
  const { user, logout } = useContext(AuthContext);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDatos = async () => {
      setLoading(true);
      try {
        const data = await ApiService.searchMeals(search);
        setMeals(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const timeoutId = setTimeout(() => fetchDatos(), 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity onPress={logout}><Text style={{color: 'red'}}>Salir</Text></TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="Buscar receta..." value={search} onChangeText={setSearch} />

      {loading ? <ActivityIndicator size="large" /> : meals.length === 0 ? (
        <Text style={styles.empty}>No hay resultados</Text>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { id: item.idMeal })}>
              <Image source={{ uri: item.strMealThumb || 'https://via.placeholder.com/100' }} style={styles.img} />
              <View>
                <Text style={styles.title}>{item.strMeal}</Text>
                <Text>{item.strCategory}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  email: { fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
  img: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  title: { fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 20 }
});