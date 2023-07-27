import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInBottom } from '@/animations/animation'

type InfoWithIconProps = {
  icon: ReactNode
  text: string | ReactNode
}

export function InfoWithIcon({ icon, text }: InfoWithIconProps) {
  return (
    <motion.div
      variants={fadeInBottom}
      className="flex w-fit items-center gap-3 overflow-hidden"
    >
      <div className="rounded-full bg-brown-600 p-2 text-white">{icon}</div>
      <p className="text-brown-text whitespace-nowrap">{text}</p>
    </motion.div>
  )
}
