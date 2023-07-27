'use client'

import { Coffee } from '@/data/coffees'
import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react'
import { produce } from 'immer'
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/localstorage/localStorage'
import { formatMoney } from '@/utils/formatMoney'

export interface CartItem extends Coffee {
  quantity: number
}

export type FormattedPrices = {
  subtotal: string
  deliveryFee: string
  total: string
}

type CoffeeContextType = {
  addCoffeeToCart: (coffee: CartItem) => void
  isOpen: boolean
  dataArray: FormattedPrices
  cartItems: CartItem[]
  cartQuantity: number
  cartItemsTotal: number
  changeCartItemQuantity: (
    cartItemId: number,
    type: 'increase' | 'decrease',
  ) => void
  getCartItemQuantity: (cartItemId: number) => number
  formattedDeliveryPrice: string
  formattedItemsTotal: string
  formattedCartTotal: string
  removeCartItem: (cartItemId: number) => void
  cleanCart: () => void
  toggleCart: () => void
}

const CartContext = createContext({} as CoffeeContextType)

type CoffeeProviderProps = {
  children: ReactNode
}

export default function CartProvider({ children }: CoffeeProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleCart = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden', 'pr-2')
    } else {
      document.body.classList.remove('overflow-hidden', 'pr-2')
    }
  }, [isOpen])

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const items = getLocalStorageItem('cartItems') || []
    setCartItems(items)
  }, [])

  const cartQuantity = cartItems.length

  const cartItemsTotal = cartItems.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity
  }, 0)

  const DELIVERY_PRICE = 3.5
  const cartTotal = DELIVERY_PRICE + cartItemsTotal
  const formattedDeliveryPrice = formatMoney(DELIVERY_PRICE)
  const formattedItemsTotal = formatMoney(cartItemsTotal)
  const formattedCartTotal = formatMoney(cartTotal)

  const dataArray = {
    subtotal: formattedItemsTotal,
    deliveryFee: formattedDeliveryPrice,
    total: formattedCartTotal,
  }

  const addCoffeeToCart = (coffee: CartItem) => {
    const coffeeIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === coffee.id,
    )

    const newCart = produce(cartItems, (draft) => {
      if (coffeeIndex === -1) {
        draft.push({ ...coffee })
      } else {
        draft[coffeeIndex].quantity += coffee.quantity
      }
    })

    setCartItems(newCart)
    setLocalStorageItem('cartItems', newCart)
  }

  const changeCartItemQuantity = (
    cartItemId: number,
    type: 'increase' | 'decrease',
  ) => {
    const newCart = produce(cartItems, (draft) => {
      const coffeeExistsInCart = cartItems.findIndex(
        (cartItem) => cartItem.id === cartItemId,
      )

      if (coffeeExistsInCart >= 0) {
        const item = draft[coffeeExistsInCart]
        draft[coffeeExistsInCart].quantity =
          type === 'increase' ? item.quantity + 1 : item.quantity - 1
      }
    })
    setCartItems(newCart)
    setLocalStorageItem('cartItems', newCart)
  }

  const removeCartItem = (cartItemId: number) => {
    const newCart = produce(cartItems, (draft) => {
      const coffeeExistsInCart = cartItems.findIndex(
        (cartItem) => cartItem.id === cartItemId,
      )

      if (coffeeExistsInCart >= 0) {
        draft.splice(coffeeExistsInCart, 1)
      }
    })
    setCartItems(newCart)
    setLocalStorageItem('cartItems', newCart)
  }

  const cleanCart = () => {
    setCartItems([])
    localStorage.removeItem('cartItems')
  }

  const getCartItemQuantity = (cartItemId: number) => {
    const cartItem = cartItems.find((item) => item.id === cartItemId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        toggleCart,
        cartItems,
        cartQuantity,
        dataArray,
        addCoffeeToCart,
        changeCartItemQuantity,
        getCartItemQuantity,
        formattedCartTotal,
        formattedDeliveryPrice,
        formattedItemsTotal,
        removeCartItem,
        cartItemsTotal,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
