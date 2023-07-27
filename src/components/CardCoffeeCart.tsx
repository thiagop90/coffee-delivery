'use client'

import { InputQuantity } from '@/components/InputQuantity'
import { CartItem } from '@/context/CartProvider'
import { formatMoney } from '@/utils/formatMoney'
import Image from 'next/image'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  coffee: CartItem
}

export function CardCoffeeCart({ coffee }: Props) {
  const coffeePrice = formatMoney(coffee.price)
  const coffeeTotal = coffee.price * coffee.quantity
  const formattedPriceTotal = formatMoney(coffeeTotal)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="flex py-6">
      <div className="">
        <div className="rounded-xl bg-gray-100 p-2">
          <div className="relative h-20 w-20">
            {isLoading && (
              <div className="absolute inset-0 leading-none">
                <Skeleton borderRadius={999} width={80} height={80} />
              </div>
            )}
            <Image
              src={`/coffees/${coffee.photo}`}
              alt=""
              width={80}
              height={80}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between">
        <h3 className="font-medium text-gray-600">{coffee.name}</h3>
        <p className="mt-0.5 text-sm text-gray-500">
          Preço:{' '}
          <span className="font-medium text-gray-600">R${coffeePrice}</span>
        </p>
        <InputQuantity
          className="mt-auto"
          key={coffee.id}
          coffee={coffee}
          value={coffee.quantity}
        />
      </div>
      <p className="font-medium text-gray-600">R${formattedPriceTotal}</p>
    </div>
  )
}
