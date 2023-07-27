import { useCoffee } from '@/context/CoffeeProvider'
import { coffeeData } from '@/data/coffees'
import { useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInRight } from '@/animations/animation'

export function FilterButtons() {
  const { coffeeTypes, handleChangeFilter, selectedTag } = useCoffee()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [selectedTag])

  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-none md:overflow-visible"
      ref={scrollContainerRef}
    >
      {coffeeTypes.map((tag, index) => (
        <motion.div
          variants={fadeInRight}
          key={index}
          className={`flex cursor-pointer items-center whitespace-nowrap rounded-full shadow-sm first:ml-6 last:mr-6`}
        >
          {selectedTag === tag && (
            <button
              title="Excluir filtro"
              onClick={() => handleChangeFilter(null)}
              className="h-[2.375rem] rounded-l-full border pl-3 pr-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          )}
          <button
            className={`flex items-center gap-2 border px-3 py-2 text-sm font-semibold uppercase transition-colors ${
              selectedTag === tag
                ? 'rounded-r-full border-transparent bg-brown-600 text-white'
                : 'rounded-full border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-600'
            }`}
            title={tag}
            type="button"
            onClick={() => handleChangeFilter(tag)}
          >
            {tag}
            <span
              className={`rounded-full px-1 text-xs ${
                selectedTag === tag
                  ? 'bg-white text-gray-900'
                  : 'bg-brown-600 text-white'
              }`}
            >
              {coffeeData.filter((coffee) => coffee.tags.includes(tag)).length}
            </span>
          </button>
        </motion.div>
      ))}
    </div>
  )
}
