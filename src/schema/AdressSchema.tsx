import * as z from 'zod'

export const addressSchema = z.object({
  cep: z.string().min(9, { message: 'Informe o CEP' }),
  street: z.string().nonempty({ message: 'Informe a rua' }),
  number: z.string().nonempty({ message: 'Informe o número' }),
  complement: z.string(),
  neighborhood: z.string().nonempty({ message: 'Informe o bairro' }),
  city: z.string().nonempty({ message: 'Informe a cidade' }),
  state: z.string().nonempty({ message: 'Informe a UF' }),
  payment: z.enum(['Cartão de crédito ou débito', 'Dinheiro', 'Pix'], {
    errorMap: () => {
      return { message: 'Informe o método de pagamento' }
    },
  }),
})

export type AddressData = z.infer<typeof addressSchema>
