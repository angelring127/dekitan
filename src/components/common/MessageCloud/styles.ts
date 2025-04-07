import { tv } from 'tailwind-variants'

export const messageCloud = tv({
  base: 'relative min-h-[48px] px-8 py-6 rounded-2xl break-words max-w-[80%] font-db',
  variants: {
    direction: {
      left: 'ml-8',
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

export const messageName = tv({
  base: 'absolute -top-6 left-8 font-name',
})

export const messageTitle = tv({
  base: 'absolute top-0 left-0 right-0 text-center font-db-title py-2',
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
  base: 'w-full p-3 text-center rounded-full transition-colors text-white border-2 border-[#05803a] font-db-btn shadow-[2px_2px_0px_#cbb199] mb-2',
  variants: {
    type: {
      default: 'bg-[#05803a] hover:bg-[#05803a]/90',
      system: 'bg-[#05803a] hover:bg-[#05803a]/90',
      selected:
        'bg-[#e6e6e6] text-black hover:bg-[#e6e6e6] border-[#e6e6e6] shadow-[2px_2px_0px_#cbb199]',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})
