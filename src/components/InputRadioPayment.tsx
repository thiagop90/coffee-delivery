import { forwardRef, ReactNode, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode
  label: string
}

export const InputRadioPayment = forwardRef<HTMLInputElement, Props>(
  function Input({ id, icon, label, ...props }, ref) {
    return (
      <div className="flex items-center">
        <input
          type="radio"
          id={id}
          value={label}
          className="hidden"
          {...props}
          ref={ref}
        />
        <label
          title={label}
          htmlFor={id}
          className="flex w-full cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500 transition-all"
        >
          <span className="text-brown-600">{icon}</span>
          {label}
        </label>
      </div>
    )
  },
)
