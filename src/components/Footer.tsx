'use client'

import Link from 'next/link'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { HiArrowUp } from 'react-icons/hi2'

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="border-t border-gray-200 bg-white px-6 ">
      <div className="m-0 mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 py-6 text-center">
        <p className="text-sm text-gray-500">
          © 2023 Coffee Delivery, Inc. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex space-x-3 text-gray-500">
            <Link
              title="Github"
              className="rounded-full border border-gray-200 p-2 hover:bg-gray-100"
              target="_blank"
              href="https://github.com/thiagop90"
            >
              <BsGithub size={20} />
            </Link>
            <Link
              title="LinkedIn"
              className="rounded-full border border-gray-200 p-2 hover:bg-gray-100"
              target="_blank"
              href="https://linkedin.com/in/psthiago"
            >
              <BsLinkedin size={20} />
            </Link>
            <button
              title="Rolar para o topo"
              onClick={handleScrollToTop}
              className="flex items-center gap-3 rounded-full border border-gray-200 p-2 text-gray-500 hover:bg-gray-100"
            >
              <HiArrowUp size={20} />
              <span className="text-sm">Rolar para o topo</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
