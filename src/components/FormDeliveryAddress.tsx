'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from './Input'
import { ChangeEvent, useState } from 'react'
import { AddressData } from '@/schema/AdressSchema'

export function FormDeliveryAddress() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [cep, setCep] = useState('')
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<AddressData>()

  const fetchAddressByCEP = async (cep: string) => {
    setLoading(true)
    setError(false)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      if (data.erro) {
        setError(true)
        setTimeout(() => setError(false), 3000)
      } else {
        setValue('street', data.logradouro)
        setValue('neighborhood', data.bairro)
        setValue('city', data.localidade)
        setValue('state', data.uf)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCEPChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = event.target.value.replace(/\D/g, '')
    const formattedCep = formattedValue.replace(/(\d{5})(\d{3})/, '$1-$2')
    setCep(formattedCep)

    if (formattedCep.length === 9) {
      fetchAddressByCEP(formattedCep)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-lg lg:max-w-full">
        <h3 className="text-lg font-medium text-gray-700">
          Endereço para entrega
        </h3>
        <p className="mt-0.5 text-sm text-gray-500">
          Informe o endereço onde deseja receber seu pedido
        </p>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
          <div className="relative sm:col-span-3">
            <Input
              inputMode="numeric"
              maxLength={9}
              label="CEP"
              value={cep}
              {...register('cep')}
              onChange={handleCEPChange}
              error={errors.cep?.message}
            />
            {loading ? (
              <span className="text-sm text-gray-500">Buscando...</span>
            ) : error ? (
              <span className="text-sm text-red-500">CEP não encontrado</span>
            ) : (
              ''
            )}
          </div>
          <div className="sm:col-span-3">
            <Input
              label="Rua"
              {...register('street')}
              error={errors.street?.message}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="number"
              inputMode="numeric"
              label="Número"
              {...register('number')}
              error={errors.number?.message}
            />
          </div>
          <div className="sm:col-span-4">
            <Input label="Complemento (opcional)" {...register('complement')} />
          </div>
          <div className="sm:col-span-3">
            <Input
              label="Bairro"
              error={errors.neighborhood?.message}
              {...register('neighborhood')}
            />
          </div>
          <div className="sm:col-span-3">
            <Input
              label="Cidade"
              error={errors.city?.message}
              {...register('city')}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Estado"
              error={errors.state?.message}
              {...register('state')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
