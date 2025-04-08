/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的エクスポート設定
  images: {
    unoptimized: true, // 静的エクスポート時の画像最適化を無効化
  },
  trailingSlash: true, // URLの末尾にスラッシュ(/)を追加
  // その他必要な設定...
}

module.exports = nextConfig
