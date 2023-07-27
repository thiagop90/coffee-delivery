'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CardCoffee } from './CardCoffee'
import { useCoffee } from '@/context/CoffeeProvider'

export function CoffeeList() {
  const { filteredCoffees, coffees, loading, selectedTag } = useCoffee()

  return (
    <div className="min-h-calculatedHeight2 px-6">
      <div className="relative mx-auto my-0 flex max-w-screen-lg flex-col pt-6">
        <div className=" mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {coffees.map((coffee) => (
            <CardCoffee key={coffee.id} coffee={coffee} />
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Resultados encontrados:{' '}
          <span className="font-semibold text-gray-600">
            {selectedTag ? filteredCoffees.length : coffees.length}
          </span>
        </p>
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 bg-white/50"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
