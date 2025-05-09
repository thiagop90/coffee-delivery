'use client'

import { InfoWithIcon } from '@/components/InfoWithIcon'
import { CoffeeList } from '@/components/CoffeeList'

import { ShoppingCart, Coffee, Package, Clock } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { FilterButtons } from '@/components/FilterButtons'
import { motion } from 'framer-motion'
import { fadeInBottom, fadeInRight } from '@/animations/animation'
import { useCoffee } from '@/context/CoffeeProvider'

export default function Home() {
  const { selectedTag } = useCoffee()
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (sectionRef.current && selectedTag) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [selectedTag])

  useEffect(() => {
    if (pathname === '/') {
      localStorage.removeItem('formData')
    }
  }, [pathname])

  return (
    <main>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        className="px-6 md:px-8"
      >
        <div className="m-0 mx-auto h-full w-full max-w-screen-lg py-20 sm:py-24 lg:pb-36 xl:pt-28">
          <div className="flex sm:justify-center sm:text-center lg:justify-between lg:gap-6 lg:text-start">
            <div className="flex flex-col sm:items-center md:max-w-3xl lg:max-w-[38.25rem] lg:items-start">
              <motion.h1
                variants={fadeInRight}
                className="text-3xl font-bold text-base-title sm:text-4xl lg:text-5xl lg:leading-[1.3]"
              >
                Encontre o café perfeito para qualquer hora do dia!
              </motion.h1>
              <motion.h2
                variants={fadeInRight}
                className="mt-4 text-base-subtitle sm:text-xl lg:mt-5"
              >
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora.
              </motion.h2>
              <div className="mt-16 grid auto-rows-auto grid-cols-1 gap-y-5 sm:grid-cols-2 lg:gap-y-7">
                <InfoWithIcon
                  icon={<ShoppingCart size={20} />}
                  text="Compra simples e segura"
                />
                <InfoWithIcon
                  icon={<Package size={20} />}
                  text="Embalagem mantém o café intacto"
                />
                <InfoWithIcon
                  icon={<Clock size={20} />}
                  text="Entrega rápida e rastreada"
                />
                <InfoWithIcon
                  icon={<Coffee size={20} />}
                  text="O café chega fresquinho até você "
                />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="hidden aspect-square rounded-full md:items-center lg:flex"
            >
              <img
                src="/coffee-friends.svg"
                alt="Coffee cup upper view"
                width={350}
                height={350}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        ref={sectionRef}
        className="py-8"
      >
        <div className="px-6">
          <motion.h3
            variants={fadeInBottom}
            className="mx-auto my-0 max-w-screen-lg text-2xl font-bold text-base-subtitle sm:text-center sm:text-3xl lg:text-[2rem]"
          >
            Nossos cafés
          </motion.h3>
        </div>

        <div className="sticky top-20 z-30 mt-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm backdrop-saturate-180">
          <div className="mx-auto my-0 max-w-screen-lg py-3 sm:flex sm:justify-center">
            <FilterButtons />
          </div>
        </div>
        <CoffeeList />
      </motion.section>
    </main>
  )
}
