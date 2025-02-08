import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-lg',
    'text-base',
    'font-medium',
    'h-12',
    'px-4',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        secondary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400',
        tertiary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
        quaternary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-400',
        quinary: 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-400',
      },
      style: {
        solid: '',
        outline: [
          'bg-transparent',
          'border-2',
          'hover:bg-opacity-10',
          'hover:bg-current',
        ],
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        style: 'outline',
        class: 'border-red-600 text-red-600 hover:bg-red-600/10',
      },
      {
        variant: 'secondary',
        style: 'outline',
        class: 'border-orange-500 text-orange-500 hover:bg-orange-500/10',
      },
      {
        variant: 'tertiary',
        style: 'outline',
        class: 'border-gray-200 text-gray-900 hover:bg-gray-200/10',
      },
      {
        variant: 'quaternary',
        style: 'outline',
        class: 'border-teal-500 text-teal-500 hover:bg-teal-500/10',
      },
      {
        variant: 'quinary',
        style: 'outline',
        class: 'border-purple-500 text-purple-500 hover:bg-purple-500/10',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      style: 'solid',
      fullWidth: false,
    },
  }
) 