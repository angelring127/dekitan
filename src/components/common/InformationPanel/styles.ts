import { cva } from 'class-variance-authority'

export const panelVariants = cva(
  [
    'w-full',
    'max-w-[320px]',
    'min-h-[320px]',
    'mx-auto',
    'overflow-hidden',
    'transition-all',
    'duration-200',
    'text-black',
    'py-6',
    'px-6',
    'rounded-2xl',
  ],
  {
    variants: {
      background: {
        white: 'bg-white',
        transparent: 'bg-transparent',
      },
      withShadow: {
        true: 'shadow-lg',
        false: '',
      },
    },
    defaultVariants: {
      background: 'white',
      withShadow: true,
    },
  }
)

export const itemVariants = cva(
  [
    'flex',
    'items-center',
    'gap-3',
    'text-center',
    'transition-all',
    'duration-300',
    'py-3',
  ],
  {
    variants: {
      visible: {
        true: 'opacity-100 translate-y-0',
        false: 'opacity-0 translate-y-4',
      },
      sequential: {
        true: 'absolute top-6 left-0 w-full px-6',
        false: 'relative mb-4 last:mb-0 px-6',
      },
    },
    defaultVariants: {
      visible: true,
      sequential: false,
    },
  }
)

// 타이핑 효과를 위한 keyframes 애니메이션
export const typingAnimation = `
  @keyframes typing {
    0% {
      width: 1ch;
      visibility: visible;
      white-space: nowrap;
      overflow: hidden;
    }
    1% {
      width: 2ch;
    }
    99% {
      white-space: nowrap;
      overflow: hidden;
    }
    100% {
      width: 100%;
      visibility: visible;
      white-space: pre-wrap;
      overflow: visible;
    }
  }

  .typing-effect {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    width: 1ch;
    visibility: visible;
    animation: typing 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    position: relative;
    min-height: 1.2em;
  }

  @keyframes blink {
    from, to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`