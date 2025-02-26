import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Navigation } from '@/components/common/Navigation'
import './globals.css'

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
  title: 'Dekitan',
  description: 'Dekitan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex justify-center bg-gray-100`}
      >
        <main className="w-full max-w-[428px] min-h-screen bg-white shadow-lg flex flex-col">
          <Navigation />
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  )
}
