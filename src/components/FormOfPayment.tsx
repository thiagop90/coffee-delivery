import { CreditCard, Banknote, Landmark } from 'lucide-react'
import { InputRadioPayment } from './InputRadioPayment'
import { useFormContext } from 'react-hook-form'
import { AddressData } from '@/schema/AdressSchema'

export function FormOfPayment() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddressData>()

  return (
    <div className="rounded-2xl border border-gray-200 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-lg lg:max-w-full">
        <h3 className="text-lg font-medium text-gray-700">
          Forma de pagamento
        </h3>
        <p className="mt-0.5 text-sm text-gray-500">
          O pagamento é feito na entrega. Escolha a forma que deseja pagar:
        </p>
        {errors.payment && (
          <p className="mt-2 text-sm text-red-500">{errors.payment.message}</p>
        )}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <InputRadioPayment
            icon={<CreditCard size={20} />}
            id="card"
            label="Cartão de crédito ou débito"
            {...register('payment')}
          />
          <InputRadioPayment
            icon={<Banknote size={20} />}
            id="money"
            label="Dinheiro"
            {...register('payment')}
          />
          <InputRadioPayment
            icon={<Landmark size={20} />}
            id="pix"
            label="Pix"
            {...register('payment')}
          />
        </div>
      </div>
    </div>
  )
}
