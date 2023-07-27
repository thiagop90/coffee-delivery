'use client'

import { useRouter } from 'next/navigation'
import { Form } from '@/components/Form'
import { useCartContext } from '@/context/CartProvider'
import { useEffect, useState } from 'react'
import { getLocalStorageItem } from '@/localstorage/localStorage'

export default function Cart() {
  const { cartQuantity } = useCartContext()
  const [dataLoaded, setDataLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getLocalStorageItem('cartItems')
    setDataLoaded(true)
  }, [])

  useEffect(() => {
    if (dataLoaded && cartQuantity === 0) {
      router.push('/')
    }
  }, [dataLoaded, cartQuantity, router])

  if (dataLoaded && cartQuantity === 0) {
    return null
  }

  return (
    <main className="min-h-calculatedHeight w-full px-4">
      <div className="mx-auto my-0 max-w-screen-lg py-6">
        <Form />
      </div>
    </main>
  )
}
