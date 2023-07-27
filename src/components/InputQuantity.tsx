'use client'

import { useCartContext } from '@/context/CartProvider'
import { Coffee } from '@/data/coffees'
import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  coffee: Coffee
}

export const InputQuantity = forwardRef<HTMLInputElement, Props>(
  function InputQuantity({ coffee, value, className, ...props }, ref) {
    const {
      addCoffeeToCart,
      getCartItemQuantity,
      changeCartItemQuantity,
      removeCartItem,
    } = useCartContext()
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
      const cartItemQuantity = getCartItemQuantity(coffee.id)
      setQuantity(cartItemQuantity)
    }, [coffee.id, getCartItemQuantity])

    const handleAddToCart = () => {
      const coffeeToAdd = {
        ...coffee,
        quantity: 1,
      }
      addCoffeeToCart(coffeeToAdd)
      setQuantity(1)
    }

    const handleRemove = () => {
      removeCartItem(coffee.id)
      setQuantity(0)
    }

    const handleIncrease = () => {
      if (quantity === 0) {
        handleAddToCart()
      } else {
        changeCartItemQuantity(coffee.id, 'increase')
        setQuantity((state) => state + 1)
      }
    }

    const handleDecrease = () => {
      if (quantity > 1) {
        changeCartItemQuantity(coffee.id, 'decrease')
        setQuantity((state) => state - 1)
      } else {
        handleRemove()
      }
    }

    return (
      <div
        className={`${className} ${
          quantity > 0 ? 'w-28' : 'w-10'
        } flex h-10 items-center justify-end overflow-hidden rounded-full border border-gray-200 bg-white transition-all duration-300`}
      >
        <div className={`${quantity === 0 ? 'hidden' : 'flex'}  items-center`}>
          <button
            onClick={handleDecrease}
            className="p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200"
            type="button"
          >
            {quantity > 1 ? <Minus size={16} /> : <Trash2 size={16} />}
          </button>
          <input
            className="w-full select-none bg-transparent text-center text-base text-gray-700"
            type="number"
            readOnly
            value={quantity}
            ref={ref}
            {...props}
          />
        </div>
        <button
          onClick={handleIncrease}
          className="p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200"
          type="button"
        >
          <Plus size={16} />
        </button>
      </div>
    )
  },
)
