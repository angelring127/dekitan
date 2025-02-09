import { tv } from 'tailwind-variants'

export const messageCloud = tv({
  base: 'relative min-h-[48px] p-4 rounded-2xl break-words max-w-[80%]',
  variants: {
    direction: {
      left: 'ml-3',
      right: 'ml-auto mr-3',
    },
    type: {
      default: 'bg-white text-black',
      system: 'bg-gray-100 text-gray-800',
      input: 'bg-white text-black',
      selection: 'bg-white text-black',
    },
    animation: {
      fadeIn: 'animate-fadeIn',
      fadeOut: 'animate-fadeOut',
      typing: 'animate-typing',
    },
  },
  defaultVariants: {
    direction: 'left',
    type: 'default',
  },
})

export const messageTail = tv({
  base: 'absolute w-3 h-3 transform',
  variants: {
    direction: {
      left: '-left-1.5 rotate-45',
      right: '-right-1.5 -rotate-45',
    },
  },
  defaultVariants: {
    direction: 'left',
  },
})

export const messageInput = tv({
  base: 'w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400',
})

export const messageButton = tv({
  base: 'w-full p-3 text-center rounded-xl transition-colors text-white',
  variants: {
    type: {
      default: 'bg-blue-500 hover:bg-blue-600',
      system: 'bg-gray-600 hover:bg-gray-700',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})
