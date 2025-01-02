import { Dialog, DialogTitle, Transition } from '@headlessui/react';
import { Fragment} from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {
  const modal = useAppStore((state) => state.modal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe)
  const closeModal = useAppStore((state) => state.closeModal)
  const handleClickFavorites = useAppStore((state) => state.handleClickFavorites)
  const favoriteExists = useAppStore((state) => state.favoriteExists)

  const renderIngredients = () =>{
    const ingredients: JSX.Element[] = []
    for (let i = 1; i <=6;i++){
        const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
        const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];
        if (ingredient && measure){
            ingredients.push(
                <li key={i} className='text-sm font-light mx-10'>
                    {ingredient} - {measure}
                </li>
            )
        }
        
    }
    return ingredients
  }
  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-xl sm:p-8" >
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold mb-5 text-center">
                      {selectedRecipe.strDrink}
                  </Dialog.Title>
                  <DialogTitle>
                    <img 
                        src={selectedRecipe.strDrinkThumb} 
                        alt={selectedRecipe.strDrink} 
                        className='mx-auto w-60'
                    />
                  </DialogTitle>
                  <Dialog.Title as="h3" className="text-gray-900 text-lg font-bold my-3 mx-10">
                    Ingredientes y Cantidades
                  </Dialog.Title>
                    {renderIngredients()}
                  <Dialog.Title as="h3" className="text-gray-900 text-lg font-bold my-3 mx-10">
                    Instrucciones
                  </Dialog.Title>
                  <p className="mx-10 text-sm font-light">{selectedRecipe.strInstructions}</p>
                  <div className="mt-5 flex truncate flex-col justify-between gap-4 px-8 md:flex md:flex-row">
                    <button
                        type="button" 
                        className="w-full rounded bg-gray-600 p-2 font-bold uppercase text-sm md:text-base text-white shadow hover:bg-gray-500"
                        onClick={closeModal}
                    >
                        Cerrar
                    </button>
                    <button
                        type="button" 
                        className="w-full rounded bg-orange-600 p-2 font-bold uppercase text-sm md:text-base text-white shadow hover:bg-orange-500"
                        onClick={() => handleClickFavorites(selectedRecipe)}
                    >
                        {favoriteExists(selectedRecipe.idDrink) 
                            ? 'Eliminar Favorito' 
                            : 'Agregar a favoritos'
                        }
                        
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}