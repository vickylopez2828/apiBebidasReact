import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"


export default function FavoritesPage() {
    const favorites = useAppStore((state) => state.favorites)
    const hasFavorites = useMemo(()=> favorites.length , [favorites])
    const clearFavorites = useAppStore((state) => state.clearFavorite)
  return (
    <>
        <div className="flex justify-between m-10 lg:ml-44 lg:mr-44  px-10">
            <h1 className="text-5xl font-extrabold ml-2">Favoritos</h1>
            {hasFavorites && (
                <button 
                    className="w-1/4 mr-2 rounded bg-orange-600 p-2 font-bold uppercase text-sm text-white shadow hover:bg-orange-500"
                    onClick={clearFavorites}
                >
                    Limpiar Favoritos
                </button>
            )}
        </div>
        {hasFavorites ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:mx-36 2xl:grid-cols-4 my-10 gap-6 px-20">
                    {favorites.map((fav) =>(
                        <DrinkCard
                            key={fav.idDrink}
                            drink={fav}
                        />
                    ))}
                </div>
                
            </>
        ) : (
            <>
                <p className="my-10 text-center text-2xl">
                    Aún no has agregado favoritos
                </p>
            </>
        )}
    </>
  )
}
