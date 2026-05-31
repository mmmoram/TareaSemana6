import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { ApiService } from '../../services/apiServices';
import { Meal } from '../../types/api';

export const DetailScreen = ({ route }: any) => {
  const { id } = route.params;
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.getMealById(id).then(setMeal).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (!meal) return <Text>Receta no encontrada</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image source={{ uri: meal.strMealThumb }} style={{ width: '100%', height: 300 }} />
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.field}>Categoría: {meal.strCategory}</Text>
        <Text style={styles.field}>Área: {meal.strArea}</Text>
        <Text style={styles.field}>Etiquetas: {meal.strTags || 'N/A'}</Text>
        <Text style={{ marginTop: 15, fontWeight: 'bold' }}>Instrucciones:</Text>
        <Text style={{ marginTop: 5 }}>{meal.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  field: { fontSize: 16, marginBottom: 5, fontWeight: '600', color: '#555' }
});