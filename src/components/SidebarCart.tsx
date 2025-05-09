'use client'

import { usePathname, useRouter } from 'next/navigation'
import { CardCoffeeCart } from './CardCoffeeCart'
import { formatMoney } from '@/utils/formatMoney'
import { useCartContext } from '@/context/CartProvider'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function SidebarCart() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    isOpen,
    toggleCart,
    cartItems,
    cleanCart,
    cartItemsTotal,
    cartQuantity,
  } = useCartContext()
  const formattedItemsTotal = formatMoney(cartItemsTotal)

  const observePage = () => {
    if (pathname !== '/') {
      router.push('/')
    }
    toggleCart()
  }

  return (
    <div className="relative z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleCart}
            className={`fixed inset-0 bg-white/50 blur-sm`}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 right-0 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0 shadow-lg' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full w-screen max-w-md flex-col bg-white">
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm backdrop-saturate-180">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <h2 className="text-lg font-medium text-gray-800">
                Carrinho de compras
              </h2>
              <button
                title="Fechar"
                className="rounded-full border border-gray-200 bg-white p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-600"
                onClick={toggleCart}
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-2 text-sm">
              <span className="font-medium text-gray-800">
                {cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}
              </span>
              <button
                title="Esvaziar carrinho"
                type="button"
                className="text-gray-500 underline disabled:cursor-not-allowed disabled:opacity-75"
                onClick={cleanCart}
                disabled={cartQuantity === 0}
              >
                Esvaziar carrinho
              </button>
            </div>
          </header>
          {cartQuantity === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <img src="/empty-cart.svg" width={250} height={250} alt="" />

              <div className="mt-6 flex flex-col text-center">
                <p className="font-medium text-gray-800">
                  Seu carrinho está vazio!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Parece que você ainda não adicionou nada ao carrinho.
                </p>
              </div>
              <button
                className="mt-4 rounded-full bg-brown-600 px-4 py-2 text-white transition-all hover:bg-brown-700 focus:ring-2 focus:ring-brown-600 focus:ring-offset-2 sm:text-sm"
                onClick={observePage}
              >
                Comece a comprar
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-gray-200 px-6">
                  <AnimatePresence mode="sync">
                    {cartItems.map((item) => (
                      <motion.li
                        layout
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
                        key={item.id}
                      >
                        <CardCoffeeCart coffee={item} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex font-medium text-gray-600">
                  <p className="flex-1">Subtotal</p>
                  <p>R${formattedItemsTotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Frete calculado na finalização da compra.
                </p>
                <div className="mt-6">
                  <button
                    title={pathname !== '/checkout' ? 'Checkout' : 'Fechar'}
                    onClick={() => {
                      if (pathname !== '/checkout') {
                        router.push('/checkout')
                      }
                      toggleCart()
                    }}
                    className="w-full rounded-full bg-brown-600 px-6 py-2 text-white transition-all hover:bg-brown-700 focus:ring-2 focus:ring-brown-600 focus:ring-offset-2"
                    disabled={cartQuantity === 0}
                  >
                    {pathname !== '/checkout' ? 'Checkout' : 'Fechar'}
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    ou{' '}
                    <button
                      title="Continue comprando"
                      type="button"
                      className="font-medium text-brown-600 hover:text-brown-500"
                      onClick={observePage}
                    >
                      Continue comprando
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}
