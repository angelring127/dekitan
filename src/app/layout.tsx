import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Navigation } from '@/components/common/Navigation'
import './globals.css'
import { NavigationProvider } from '@/components/common/Navigation/NavigationContext'
import { DisablePullToRefresh } from '@/components/common/Navigation/DisablePullToRefresh'
import { PullIndicator } from '@/components/common/Navigation/PullIndicator'
import { Button } from '@/components/common/Button'

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
            <footer>
              <div className='flex flex-wrap'>
                <div className='w-[50%]'><a className='w-full text-[32px] font-semibold' href="https://www.kokuyo.co.jp/com/">会社情報</a></div>
                <div className='w-[50%]'><a className='w-full text-[32px] font-semibold' href="">お問い合わせ窓口</a></div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-[50%]'><a className='w-full text-[32px] font-semibold' href="https://hellofamily.kokuyo.co.jp/view/page/terms">利用規約</a></div>
                <div className='w-[50%]'><a className='w-full text-[32px] font-semibold' href="">初期設定・FAQ</a></div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-[50%]'><a className='w-full text-[32px] font-semibold' href="https://hellofamily.kokuyo.co.jp/view/contract">特定商取引法に基づく表記</a></div>
                <div className='w-[50%'></div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-[50%]'><a className='w-full text-[32px] font-semibold' href="https://hellofamily.kokuyo.co.jp/view/policy">プライバシーポリシー</a></div>
                <div className='w-[50%]'></div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-[50%]'><a className='w-full text-[32px] font-semibold' href="">サポート</a></div>
                <div className='w-[50%]'></div>
              </div>
            </footer>
          </main>
        </NavigationProvider>
      </body>
    </html>
  )
}
