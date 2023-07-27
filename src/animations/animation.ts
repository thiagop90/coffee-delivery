const visible = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  transition: { duration: 0.8 },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible,
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible,
}

export const fadeInBottom = {
  hidden: { opacity: 0, y: 20 },
  visible,
}

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible,
}

export const fadeInOpacity = {
  hidden: { opacity: 0 },
  visible,
}
