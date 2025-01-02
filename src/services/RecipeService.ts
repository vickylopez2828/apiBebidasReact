import axios from 'axios'
import { CategoriesAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from '../schemas/recipies-schema'
import { Drink, SearchFilter } from '../types'


const URL_BASE = "https://www.thecocktaildb.com/api/json/v1/1/"
export async function getCategories(){
    const {data} = await axios(`${URL_BASE}list.php?c=list`)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result){
        return result.data
    }
}

export async function getRecipies(filters: SearchFilter){
    const {data} = await axios(`${URL_BASE}filter.php?c=${filters.category}&i=${filters.ingredient}`)
    
    const result = DrinksAPIResponseSchema.safeParse(data)
    if(result){
        return result.data
    }
}

export async function getRecipe(id:Drink['idDrink']){
    const url = `${URL_BASE}lookup.php?i=${id}`
    const {data} = await axios(url)

    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result){
        return result.data
    }
}