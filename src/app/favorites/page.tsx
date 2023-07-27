'use client'

import { CardCoffee } from '@/components/CardCoffee'
import { useCoffee } from '@/context/CoffeeProvider'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function Favorites() {
  const router = useRouter()
  const { clearList, quantityFavorites, favoriteCoffees } = useCoffee()

  return (
    <main className="flex min-h-calculatedHeight flex-col">
      <div className="sticky top-20 z-20 border-b border-gray-200 bg-white/80 px-6 backdrop-blur-sm backdrop-saturate-180">
        <div className="mx-auto my-0 flex max-w-screen-lg items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-zinc-700">
              <button
                title="Voltar"
                onClick={() => router.back()}
                className="rounded-full border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-600"
              >
                <ChevronLeft size={16} />
              </button>
              <h1 className="text-lg font-medium">Favoritos</h1>
            </div>
            <span className="text-zinc-700">•</span>
            <h3 className="text-sm font-medium text-gray-500">
              {quantityFavorites} {quantityFavorites > 1 ? 'itens' : 'item'}
            </h3>
          </div>
          <button
            title="Limpar lista"
            type="button"
            className="text-sm text-gray-500 underline disabled:cursor-not-allowed disabled:opacity-75"
            onClick={clearList}
            disabled={quantityFavorites === 0}
          >
            Limpar lista
          </button>
        </div>
      </div>
      <div className="flex flex-1 px-6">
        {quantityFavorites > 0 ? (
          <div className="mx-auto my-0 max-w-screen-lg py-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteCoffees.map((coffee) => (
                <CardCoffee key={coffee.id} coffee={coffee} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p>Você não possui cafés favoritos.</p>
            <button
              title="Voltar"
              onClick={() => router.back()}
              className="mt-4 whitespace-nowrap rounded-full bg-brown-600 px-4 py-2 text-white transition-all hover:bg-brown-700 focus:ring-2 focus:ring-brown-600 focus:ring-offset-2 sm:text-sm"
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
