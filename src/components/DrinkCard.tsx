/* From Uiverse.io by Yaya12085 */ 
import { Drink } from '../types';
import { useAppStore } from '../stores/useAppStore';

type DrinkCardProps ={
    drink:Drink
}
export default function DrinkCard({drink}:DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)
  return (
    <div className='border shadow-lg'>
        <div className='overflow-hidden'>
            <img src={drink.strDrinkThumb} alt={drink.strDrink} 
                className='hover:scale-125 transition-transform hover:rotate-2'
            />
        </div>
        <div className='p-5'>
            <h2 className='text-xl truncate font-black'>{drink.strDrink}</h2>
            <button
                type='button'
                className='bg-orange-400 hover:bg-orange-500 mt-5 w-full  sm:p-1 md:p-1 lg:p-2
                 text-white text-sm lg:text-base font-bold'
                onClick={() => selectRecipe(drink.idDrink)}
            >
                Ver Receta
            </button>
        </div>
       
    </div>
  );
}


