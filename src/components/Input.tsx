import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, value, ...rest },
  ref,
) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label
        title={label}
        htmlFor={rest.id ?? rest.name}
        className="block text-sm font-medium text-gray-600"
      >
        {label}
        <input
          {...rest}
          ref={ref}
          value={value}
          className={`mt-1 w-full appearance-none text-ellipsis whitespace-nowrap rounded-full border px-4 py-2 transition-all  focus:border-transparent focus:ring-2 focus:ring-brown-600
        ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
      </label>
      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : ''}
    </div>
  )
})
