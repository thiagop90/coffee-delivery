'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getLocalStorageItem } from '@/localstorage/localStorage'
import {
  CartItem,
  FormattedPrices,
  useCartContext,
} from '@/context/CartProvider'
import { AddressData } from '@/schema/AdressSchema'
import { CardCoffeeSelected } from '@/components/CardCoffeeSelected'
import { motion } from 'framer-motion'
import { fadeInBottom } from '@/animations/animation'

export default function OrderConfirmation() {
  const [selectedCoffees, setSelectedCoffees] = useState<CartItem[]>([])
  const [deliveryAddress, setDeliveryAddress] = useState<AddressData>(
    {} as AddressData,
  )
  const [formattedPrices, setFormattedPrices] = useState<FormattedPrices>(
    {} as FormattedPrices,
  )
  const { cleanCart } = useCartContext()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/orderconfirmation') {
      cleanCart()
    }
  }, [])

  useEffect(() => {
    const formData = getLocalStorageItem('formData')

    if (!formData) {
      router.push('/')
    } else {
      setDeliveryAddress(formData.deliveryAddress)
      setSelectedCoffees(formData.selectedCoffees)
      setFormattedPrices(formData.formattedPrices)
    }
  }, [router])

  if (!deliveryAddress || !selectedCoffees || !formattedPrices) {
    return null
  }

  const { street, number, complement, neighborhood, city, state, payment } =
    deliveryAddress

  return (
    <main className="min-h-calculatedHeight w-full px-4">
      <div className="mx-auto my-0 max-w-screen-lg pb-24 pt-8 sm:pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="px-2 sm:text-center lg:px-0"
        >
          <motion.p
            variants={fadeInBottom}
            className="text-lg font-medium text-brown-600"
          >
            Obrigado!
          </motion.p>
          <motion.h1
            variants={fadeInBottom}
            className="mt-0.5 text-4xl font-bold text-base-title"
          >
            Pedido confirmado!
          </motion.h1>
          <motion.p variants={fadeInBottom} className="mt-0.5 text-gray-500">
            Agora é só aguardar que logo o café chegará até você.
          </motion.p>
        </motion.div>

        <div className="mt-8 rounded-2xl border border-gray-200 px-4 py-8 sm:px-6">
          <h3 className="text-lg font-medium text-zinc-700">
            Cafés escolhidos:
          </h3>
          <ul
            className={`grid divide-y divide-gray-200 md:divide-y-0 ${
              selectedCoffees.length > 1
                ? 'gap-x-6 md:grid-cols-2'
                : 'grid-cols-1 '
            }`}
          >
            {selectedCoffees.map((coffee) => (
              <CardCoffeeSelected key={coffee.id} coffee={coffee} />
            ))}
          </ul>
        </div>
        <div className="mt-8 rounded-2xl bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-8">
          <div className="grid grid-cols-2 gap-6 md:gap-x-8 lg:col-span-7">
            <div>
              <span className="font-medium text-gray-700">
                Endereço de entrega
              </span>
              <div className="mt-3 flex flex-col text-sm text-gray-500">
                <span>{street}</span>
                <span>
                  {number} {complement} {neighborhood}
                </span>
                <span>
                  {city} {state}
                </span>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">
                Forma de pagamento
              </span>
              <div className="mt-3 flex flex-col text-sm text-gray-500">
                <span>Na entrega:</span>
                <span>{payment}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
            <div className="flex items-center justify-between pb-4">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-600">
                R${formattedPrices.subtotal}
              </span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-gray-500">Taxa de entrega</span>
              <span className="font-medium text-gray-600">
                R${formattedPrices.deliveryFee}
              </span>
            </div>
            <div className="flex items-center justify-between py-4 text-base font-medium">
              <span className="text-gray-700">Total</span>
              <span className="font-medium text-brown-600">
                R${formattedPrices.total}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center px-2">
          <button
            className="w-full rounded-full bg-brown-600 px-6 py-2 text-white transition-all hover:bg-brown-700 focus:ring-2 focus:ring-brown-600 focus:ring-offset-2 sm:w-fit sm:text-sm"
            onClick={() => {
              router.push('/')
            }}
          >
            Continue comprando
          </button>
        </div>
      </div>
    </main>
  )
}
