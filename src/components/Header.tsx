import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
    const {pathname} = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const categories =  useAppStore((state) => state.categories)
    const fetchCategories =  useAppStore((state) => state.fetchCategories)
    const searchRecipies =  useAppStore((state) => state.searchRecipies)
    const showNotification = useAppStore((state) => state.showNotification)
    
    const [searchFilter, setSearchFilter] = useState({
        ingredient:'',
        category:''
    })
    
    useEffect(()=>{
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) =>{
        setSearchFilter({
            ...searchFilter,
            [e.target.name] : e.target.value
        })        
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(Object.values(searchFilter).includes('')){
            showNotification({
                text:"Todos los campos son obligatorios",
                error: true
            })
            return
        }
        searchRecipies(searchFilter)
        setSearchFilter({
            ingredient:'',
            category:''
        })
    }
  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
        <div className="mx-auto container px-20 lg:px-56 py-5">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logotipo" />
                </div>
                <nav className="flex gap-10">
                    <NavLink to="/" 
                        className={({isActive}) =>
                            isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                        }
                    >Inicio</NavLink>
                    <NavLink to="/favorites" 
                        className={({isActive}) =>
                            isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                        }
                    >Favoritos</NavLink>
                    <NavLink to="/generate" 
                        className={({isActive}) =>
                            isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                        }
                    >Generar con IA</NavLink>
                </nav>
            </div>
            {isHome &&(
                <form 
                    className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-orange-400 my-24 p-10 rounded-lg shadow space-y-6"
                    onSubmit={handleSubmit}
                >
                    
                    <div className="space-y-4">
                        <label 
                            htmlFor="ingredient"
                            className="block text-white uppercase font-extrabold text-lg"
                        >Nombre o Ingredientes</label>
                        <input 
                            type="text" 
                            id="ingredient"
                            name="ingredient"
                            value={searchFilter.ingredient}
                            className="p-3 w-full rounded-lg focus:outline-none"
                            placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-4">
                        <label 
                            htmlFor="category"
                            className="block text-white uppercase font-extrabold text-lg"
                        >Categoría</label>
                        <select 
                            id="category"
                            name="category"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            onChange={handleChange}
                            value={searchFilter.category}
                        >
                            <option value="">-- Seleccione --</option>
                            {categories.drinks.map( category =>(
                                <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                            ))}
                        </select>
                        
                    </div>
                    <input 
                        type="submit" 
                        className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white text-sm sm:text-base font-extrabold w-full p-2 rounded-lg uppercase"
                        value="Buscar Recetas"
                    />
                </form>
            )}
        </div>
    </header>
  )
}
