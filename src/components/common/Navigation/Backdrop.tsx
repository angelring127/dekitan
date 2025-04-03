'use client'

import { useNavigation } from './NavigationContext'

export function Backdrop() {
  const { showUserMenu } = useNavigation()

  if (!showUserMenu) return null

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-[10px] z-[99] pointer-events-none"
      style={{
        clipPath: 'inset(56px 0 0 0)',
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '500px',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        zIndex: 99,
        pointerEvents: 'none',
      }}
    />
  )
}
