import { StateCreator } from "zustand"
import { getCategories, getRecipe, getRecipies } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoriteSliceType } from "./FavoriteSlice"



export type RecipeSliceType ={
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipies: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id:Drink['idDrink']) => Promise<void>
    closeModal: ()=>void
}
export const createRecipeSlice : StateCreator<RecipeSliceType & FavoriteSliceType, [], [], RecipeSliceType> = (set, get, api) =>({
    categories:{
        drinks:[]
    },
    drinks:{
        drinks:[]
    },
    selectedRecipe:{} as Recipe,
    modal: false,
    fetchCategories: async () =>{
        const categories = await getCategories()
        set(() =>({
            categories
        }))
    },
    searchRecipies: async (searchFilter) =>{
        const drinks = await getRecipies(searchFilter)
        set(() =>({
            drinks
        }))
    },
    selectRecipe: async (id) =>{
        const selectedRecipe = await getRecipe(id)
        set(() =>({
            selectedRecipe,
            modal:true
        }))
    },
    closeModal: () =>{
        set(() =>({
            modal:false,
            selectedRecipe:{} as Recipe
        }))
    }
})