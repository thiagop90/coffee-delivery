import { ReactNode } from 'react'

export const metadata = {
  title: 'Confirmação do pedido',
}

export default function OrderConfirmationLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
