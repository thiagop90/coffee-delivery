'use client'

import { InputQuantity } from './InputQuantity'
import { formatMoney } from '@/utils/formatMoney'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCoffee } from '@/context/CoffeeProvider'
import { Coffee } from '@/data/coffees'
import { Heart } from 'lucide-react'

interface Props {
  coffee: Coffee
}

export function CardCoffee({ coffee }: Props) {
  const { favoriteCoffees, toggleFavoriteCoffee } = useCoffee()
  const formattedPrice = formatMoney(coffee.price)

  const isFavorite = favoriteCoffees.some(
    (favCoffee) => favCoffee.id === coffee.id,
  )

  const handleToggleFavorite = () => {
    toggleFavoriteCoffee(coffee)
  }

  return (
    <div className="flex max-w-sm flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-custom">
      <div className="relative flex flex-1 bg-gray-50">
        <div className="z-10 flex w-2/3 flex-col bg-white/50 px-5 py-12 backdrop-blur-sm backdrop-saturate-150">
          <div className="my-auto flex flex-col">
            <h2 className={`text-lg font-medium text-base-subtitle`}>
              {coffee.name}
            </h2>
            <h3 className={` mt-1 text-sm text-gray-500`}>
              {coffee.description}.
            </h3>
          </div>
        </div>
        <div className="relative flex flex-1 items-center">
          <div className="absolute -left-12 h-[7.5rem] w-[7.5rem]">
            <img
              src={`/coffees/${coffee.photo}`}
              alt="Coffee cup upper view"
              width={120}
              height={120}
            />
          </div>
        </div>
        <button
          title={`${isFavorite ? 'Desfavoritar' : 'Favoritar'}`}
          onClick={handleToggleFavorite}
          className="absolute right-3 top-3 rounded-full p-2 text-brown-600"
        >
          <Heart
            className={`${
              isFavorite && 'animate-favorite-button-animation fill-brown-600'
            }`}
            size={24}
          />
        </button>
      </div>

      <div className="flex items-center border-t border-gray-200 px-4 py-2">
        <p className="text-sm font-medium text-gray-500">Tags:</p>
        <div className="ml-2 flex gap-2">
          {coffee.tags.map((tag, index) => (
            <div
              key={index}
              className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-[0.375rem] text-xs 
              font-bold uppercase text-brown-600 shadow-sm"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 px-5 py-3">
        <div className="flex items-center">
          <span className="mr-auto font-medium text-zinc-700">
            R${formattedPrice}
          </span>
          <div className="flex items-center gap-3">
            <InputQuantity key={coffee.id} coffee={coffee} />
          </div>
        </div>
      </div>
    </div>
  )
}
