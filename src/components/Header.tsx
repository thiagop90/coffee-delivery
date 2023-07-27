'use client'

import Image from 'next/image'
import { formatMoney } from '@/utils/formatMoney'
import { useCartContext } from '@/context/CartProvider'
import Link from 'next/link'
import { useCoffee } from '@/context/CoffeeProvider'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft, Heart, ShoppingCart } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { cartQuantity, cartItemsTotal, toggleCart } = useCartContext()
  const { favoriteCoffees, quantityFavorites } = useCoffee()

  const formattedItemsTotal = formatMoney(cartItemsTotal)

  return (
    <header className="sticky top-0 z-40 h-20 w-full border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-sm backdrop-saturate-180 transition duration-300">
      <div
        className={`relative m-0 mx-auto flex 
         max-w-5xl items-center justify-between transition-all`}
      >
        <div
          className={`${
            pathname === '/checkout'
              ? 'flex items-center gap-3 text-zinc-700'
              : 'hidden'
          }`}
        >
          <button
            title="Voltar"
            onClick={() => router.push('/')}
            className="rounded-full border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-600"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-lg font-medium">Checkout</span>
        </div>
        <Link
          href="/"
          className={`${
            pathname === '/checkout'
              ? 'hidden md:flex'
              : 'flex items-center gap-1'
          }`}
        >
          <Image
            src="/coffee-cup.png"
            alt=""
            quality={100}
            width={48}
            height={48}
          />

          <div
            className={`${
              pathname === '/checkout' ? 'hidden' : 'hidden sm:flex sm:flex-col'
            } font-bold uppercase`}
          >
            <p className="text-lg leading-none text-brown-600">Coffee</p>
            <span className="text-sm leading-none text-brown-800">
              Delivery
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <button
            title="Favoritos"
            onClick={() => router.push('/favorites')}
            className="group relative rounded-full border border-gray-200 bg-white p-2 text-brown-600 transition-colors hover:bg-gray-100"
          >
            <Heart className="group-hover:text-red-400" size={24} />
            {favoriteCoffees.length > 0 && (
              <span className="absolute -right-1 -top-2 h-5 w-5 rounded-full border-2 border-white bg-brown-600 px-1 text-xs font-bold text-white">
                {quantityFavorites}
              </span>
            )}
          </button>
          <button
            title="Carrinho"
            onClick={toggleCart}
            className={`flex items-center gap-2 rounded-full border px-3 py-2 transition-colors
             ${
               cartQuantity > 0
                 ? 'border-transparent bg-brown-600 text-white'
                 : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-800'
             }`}
          >
            <ShoppingCart
              className={`${
                cartQuantity > 0 ? 'text-white' : 'text-brown-600'
              }`}
              size={24}
            />
            <div className="flex flex-col text-start font-medium">
              <span className="relative text-xs">R$ {formattedItemsTotal}</span>
              <span className="text-[0.625rem] leading-3">
                {cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
