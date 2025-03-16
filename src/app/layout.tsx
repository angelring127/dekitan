import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Navigation } from '@/components/common/Navigation'
import './globals.css'
import { NavigationProvider } from '@/components/common/Navigation/NavigationContext'
import { DisablePullToRefresh } from '@/components/common/Navigation/DisablePullToRefresh'
import { PullIndicator } from '@/components/common/Navigation/PullIndicator'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'わくわくワールド',
  description: 'わくわくワールド',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex justify-center bg-gray-100`}
      >
        <NavigationProvider hideNavOnLoad={true}>
          <DisablePullToRefresh />
          <PullIndicator />
          <main className="w-full max-w-[500px] mx-auto min-h-screen bg-white shadow-lg flex flex-col border-l-0 border-r-0 md:border-l-4 md:border-r-4 border-[#00803a]">
            <Navigation />
            <div className="flex-1 overflow-auto">{children}</div>
          </main>
        </NavigationProvider>
      </body>
    </html>
  )
}
