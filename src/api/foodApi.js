import axios from 'axios';
import { FOOD_API_URL } from '../helper/config';
import { FOOD_API_KEY } from '../helper/config';

async function searchFood(query) {
  try {
    const options = {
      headers: { 'X-Api-Key': FOOD_API_KEY },
    };
    const res = await axios.get(`${FOOD_API_URL}${query}`, options);
    if (res.data.length === 0) return {};

    const data = {
      name: res.data[0].name,
      calories: res.data[0].calories,
      protein: res.data[0].protein_g,
      carb: res.data[0].carbohydrates_total_g,
      fat: res.data[0].fat_total_g,
      serving: res.data[0].serving_size_g,
    };
    return data;
  } catch (error) {
    console.error(error);
  }
}
export default searchFood;

