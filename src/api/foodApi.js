import axios from 'axios'
import RandomKey from '../components/RandomKey'
import { FOOD_API_URL } from '../helper/config'
import { NINJA_API_KEY } from '../helper/config'

async function searchFood(query) {
   try {
      const options = {
         headers: { 'X-Api-Key': NINJA_API_KEY },
      }
      const res = await axios.get(`${FOOD_API_URL}${query}`, options)
      if (res.data.length === 0) {
         alert('Το φαγητο που ψαχνετε δεν υπαρχει στην λιστα δεδομενων μας')
         return {}
      }

      const data = {
         name: res.data[0].name,
         calories: res.data[0].calories,
         protein: res.data[0].protein_g,
         carb: res.data[0].carbohydrates_total_g,
         fat: res.data[0].fat_total_g,
         serving: res.data[0].serving_size_g,
      }
      return data

      // return {
      //   name: 'milk',
      //   calories: 550,
      //   protein: 10,
      //   carb: 20,
      //   fat: 10,
      //   serving: 100,
      //   id: RandomKey(),
      // };
   } catch (error) {
      console.error(error)
   }
}

export default searchFood
