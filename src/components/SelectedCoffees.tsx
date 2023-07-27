import { CardCoffeeSelected } from '@/components/CardCoffeeSelected'
import { useCartContext } from '@/context/CartProvider'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export function SelectedCoffees() {
  const [isOpenList, setIsOpenList] = useState(true)
  const toggleList = () => setIsOpenList(!isOpenList)
  const {
    cartItems,
    cartQuantity,
    formattedItemsTotal,
    formattedDeliveryPrice,
    formattedCartTotal,
    toggleCart,
  } = useCartContext()

  const {
    formState: { errors },
  } = useFormContext()

  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm ">
      <div className="mx-auto max-w-lg">
        <motion.button
          onClick={toggleList}
          type="button"
          className="relative z-10 flex w-full items-center border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-8"
        >
          <span className="mr-auto text-lg font-medium text-gray-700">
            Resumo do pedido
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500">
            {isOpenList ? 'Recolher' : 'Exibir'} lista
            <ChevronDown
              className={`transition-transform duration-500 ${
                isOpenList ? 'rotate-180' : 'rotate-0'
              }`}
              size={20}
            />
          </span>
        </motion.button>
        <AnimatePresence initial={false}>
          {isOpenList && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{
                duration: 0.5,
              }}
              className="border-b border-gray-200"
            >
              <motion.div
                variants={{ collapsed: { y: '-100%' }, open: { y: 0 } }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 text-sm sm:px-8">
                  <span className="font-medium text-gray-800">
                    {cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}
                  </span>
                  <button
                    title="Editar"
                    type="button"
                    className="text-gray-500 underline"
                    onClick={toggleCart}
                  >
                    Editar
                  </button>
                </div>
                <ul className="divide-y divide-gray-200 px-4 sm:px-8">
                  {cartItems.map((item) => (
                    <CardCoffeeSelected key={item.id} coffee={item} />
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-5 px-4 py-6 sm:px-8">
          <div className="flex text-sm">
            <span className="flex-1 text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-600">
              R${formattedItemsTotal}
            </span>
          </div>
          <div className="flex text-sm">
            <span className="flex-1 text-gray-500">Taxa de entrega</span>
            <span className="font-medium text-gray-600">
              R${formattedDeliveryPrice}
            </span>
          </div>
          <div className="flex border-t border-gray-200 pt-5 font-medium text-gray-600">
            <span className="flex-1">Total</span>
            <span>R${formattedCartTotal}</span>
          </div>
        </div>
        <div className="flex flex-col border-t border-gray-200 px-4 py-5 text-center sm:px-6">
          <button
            type="submit"
            className="w-full rounded-full bg-brown-600 px-6 py-2 text-white transition-all hover:bg-brown-700 focus:ring-2 focus:ring-brown-600 focus:ring-offset-2 sm:text-sm"
          >
            Confirmar pedido
          </button>
          {hasErrors && (
            <span className="mt-3 text-sm text-gray-500">
              Preencha os campos obrigatórios para finalizar o pedido.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
