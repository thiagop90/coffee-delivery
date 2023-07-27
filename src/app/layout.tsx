import { ReactNode } from 'react'
import './globals.css'

import { Karla } from 'next/font/google'
import CartProvider from '@/context/CartProvider'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SidebarCart from '@/components/SidebarCart'
import { CoffeeProvider } from '@/context/CoffeeProvider'

export const metadata = {
  title: {
    default: 'Coffee Delivery',
    template: '%s |  Coffee Delivery',
  },
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
}

const myFont = Karla({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-brown-600 scrollbar-thumb-rounded-full`}
        suppressHydrationWarning={true}
      >
        <CartProvider>
          <CoffeeProvider>
            <Header />
            <SidebarCart />
            {children}
            <Footer />
          </CoffeeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
