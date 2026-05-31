import { apiClient } from '../config/axiosClient';
import { Meal, MealResponse } from '../types/api';

export class ApiService {
  static async searchMeals(query: string = ''): Promise<Meal[]> {
    const response = await apiClient.get<MealResponse>(`/search.php?s=${query}`);
    return response.data.meals || [];
  }

  static async getMealById(id: string): Promise<Meal> {
    const response = await apiClient.get<MealResponse>(`/lookup.php?i=${id}`);
    if (!response.data.meals || response.data.meals.length === 0) {
      throw new Error('Receta no encontrada');
    }
    return response.data.meals[0];
  }
}