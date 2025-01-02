import { StateCreator } from "zustand"
import { Drink, Recipe } from "../types"
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"




export type FavoriteSliceType ={
    
    favorites: Recipe[]
    handleClickFavorites: (recipe:Recipe) => void
    favoriteExists: (id:Drink['idDrink']) => boolean
    loadFromStorage: () => void
    clearFavorite:()=>void
}
export const createFavoriteSlice : StateCreator<FavoriteSliceType & RecipeSliceType & NotificationSliceType, [], [], 
    FavoriteSliceType> = (set, get, api) =>({
    favorites:[],
    handleClickFavorites : (recipe)=>{
        if(get().favoriteExists(recipe.idDrink)){
            set((state) =>({
                favorites: state.favorites.filter(fav => fav.idDrink !== recipe.idDrink),
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: "Se eliminó de favoritos",
                error: false
            })
        } else {
            set((state) =>({
                favorites: [...state.favorites, recipe],
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: "Se agregó a favoritos",
                error: false
            })
            
        }
        createRecipeSlice(set,get,api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    }, 
    favoriteExists : (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage : () =>{
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    },
    clearFavorite : () =>{
        set({
            favorites: []
        })
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    }
   
})