import api from '../lib/api'
import { CategoriesAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from '../schemas/recipies-schema'
import { Drink, SearchFilter } from '../types'



export async function getCategories(){
    const url = 'list.php?c=list'
    const {data} = await api(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result){
        return result.data
    }
}

export async function getRecipies(filters: SearchFilter){
    const url = `filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data} = await api(url)
    
    const result = DrinksAPIResponseSchema.safeParse(data)
    if(result){
        return result.data
    }
}

export async function getRecipe(id:Drink['idDrink']){
    const url = `lookup.php?i=${id}`
    const {data} = await api(url)

    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result){
        return result.data
    }
}