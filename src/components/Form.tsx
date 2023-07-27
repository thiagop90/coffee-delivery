'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { setLocalStorageItem } from '@/localstorage/localStorage'
import { FormDeliveryAddress } from './FormDeliveryAddress'
import { FormOfPayment } from './FormOfPayment'
import { SelectedCoffees } from './SelectedCoffees'
import { useCartContext } from '@/context/CartProvider'
import { AddressData, addressSchema } from '@/schema/AdressSchema'

export function Form() {
  const { dataArray, cartItems } = useCartContext()
  const router = useRouter()

  const methods = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
  })
  const { handleSubmit } = methods

  const onSubmit = (data: AddressData) => {
    router.push('/orderconfirmation')
    const formData = {
      deliveryAddress: data,
      selectedCoffees: cartItems,
      formattedPrices: dataArray,
    }

    setLocalStorageItem('formData', formData)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex h-full w-full flex-col gap-8 lg:sticky lg:top-[6.5rem]">
            <FormDeliveryAddress />
            <FormOfPayment />
          </div>
          <div className="w-full lg:w-9/12">
            <SelectedCoffees />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
