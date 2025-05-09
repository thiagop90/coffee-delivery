'use client'

import { CartItem } from '@/context/CartProvider'
import { formatMoney } from '@/utils/formatMoney'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  coffee: CartItem
}

export function CardCoffeeSelected({ coffee }: Props) {
  const coffeeTotal = coffee.price * coffee.quantity
  const formattedPrice = formatMoney(coffee.price)
  const formattedPriceTotal = formatMoney(coffeeTotal)
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <li className="flex py-6">
      <div
        className={`h-20 w-20 rounded-xl bg-gray-100 p-2 ${
          pathname === '/orderconfirmation' && 'sm:h-[88px] sm:w-[88px]'
        }`}
      >
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 leading-none">
              <Skeleton borderRadius={999} width="100%" height="100%" />
            </div>
          )}
          <img
            src={`/coffees/${coffee.photo}`}
            alt=""
            width={80}
            height={80}
            onLoad={handleImageLoad}
          />
        </div>
      </div>

      <div className={`ml-4 flex flex-1 flex-col`}>
        <h4 className="font-medium text-gray-600">{coffee.name}</h4>
        {pathname === '/orderconfirmation' && (
          <p className="mt-0.5 text-sm text-gray-500">{coffee.description}</p>
        )}
        <div className="mt-1">
          <dl
            className={`${
              pathname === '/checkout'
                ? 'flex flex-col space-y-0.5'
                : 'flex space-x-4'
            } text-sm`}
          >
            <p className="text-gray-500">
              Quantidade:{' '}
              <span className="font-medium text-gray-600">
                {coffee.quantity}
              </span>
            </p>
            <p className="text-gray-500">
              Preço:{' '}
              <span className="font-medium text-gray-600">
                R${formattedPrice}
              </span>
            </p>
          </dl>
        </div>
      </div>
      {pathname === '/checkout' && (
        <p className="ml-4 text-sm font-medium text-gray-600">
          R${formattedPriceTotal}
        </p>
      )}
    </li>
  )
}
