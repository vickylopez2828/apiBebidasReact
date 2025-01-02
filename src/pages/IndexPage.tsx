import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"


export default function IndexPage() {
    const drinks = useAppStore((state) => state.drinks)
    const hasDrinks = useMemo(()=> drinks.drinks.length , [drinks])
  return (
    <>
        <div className="flex justify-between m-10 lg:ml-44 lg:mr-44  px-10">
            <h1 className="text-5xl font-extrabold ml-2">Recetas</h1>
        </div>
        {hasDrinks ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:mx-36 2xl:grid-cols-4 my-10 gap-6 px-20">
                    {drinks.drinks.map((drink) =>(
                        <DrinkCard
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
                
            </>
        ) : (
            <>
                <p className="my-10 text-center text-2xl">
                    No hay resultados aún, utiliza el formulario para buscar recetas.
                </p>
            </>
        )}
    </>
  )
}
