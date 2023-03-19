import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getNutritionDataApi = createApi({
   reducerPath: 'nutrition data',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.api-ninjas.com',
   }),

   endpoints(builder) {
      return {
         getNutritionData: builder.query({
            query: ingredient => {
               return {
                  url: 'v1/nutrition',
                  headers: {
                     'X-Api-Key': 'Qwl5+75I9DXtOQFKazelyQ==UcQ3BFwo90tS46lP',
                  },
                  params: {
                     query: ingredient,
                  },
                  method: 'GET',
               }
            },
         }),
      }
   },
})

export const { useGetNutritionDataQuery } = getNutritionDataApi
export { getNutritionDataApi }

// DEN DOULEUEI ME QUERY PAIRNEI TA DATA APO THUNK
