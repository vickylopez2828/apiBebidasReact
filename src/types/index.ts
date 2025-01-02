import {z} from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema, SearchFilterSchema } from '../schemas/recipies-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>
export type Drink = z.infer<typeof DrinkAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>