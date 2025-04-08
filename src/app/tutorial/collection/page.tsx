// 'use client'

// import { useState, useEffect } from 'react'
// import { InformationPanel } from '@/components/common/InformationPanel'
// import { useInitialItems } from '@/hooks/useInitialItems'
// import Image from 'next/image'
// import { Button } from '@/components/common/Button'
// import { relative } from 'path'

// export default function InitPage() {
//   const [currentIndex, setCurrentIndex] = useState(0)

//   const handleNext = () => {
//     if (currentIndex < items.length - 1) {
//       setCurrentIndex((prev) => prev + 1)
//     }
//   }

//   const commonPanelStyle = {
//     borderRadius: 20,
//     position: 'relative' as const,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   }

//   const items = [
//     {
//       id: 'item',
//       content: (
//         <div className="text-center">
//           <Image
//             src="/images/effect.png"
//             alt="item"
//             width={250}
//             height={250}
//             className="mx-auto h-auto"
//             style={{position:"relative",top: "-100px",overflow:"visible"}}
//           />
//           <h1 className="text-2xl font-bold text-black">宇宙のスケール</h1>
//           <p>星までの長さと時間を</p>
//           <p>はかることができる</p>
//           <p>じょうぎ！</p>
//           <p>夜は空を見上げて</p>
//           <p>星をながめてみよう</p>
//           <Button className="rounded-full" variant='secondary'>コレクションする</Button>
//         </div>
//       )
//     },
//     {
//       id: 'house',
//       content: (
//         <div className="text-center">
//           <p>ゲットしたアイテムは</p>
//           <p>ぼくのじまんのおうちに</p>
//           <p>かざっておくね</p>
//         </div>
//       )
//     },
//     {
//       id: 'collection',
//       content: (
//         <div className="text-center">
//           <p>ひとつコレクションが</p>
//           <p>ふえたよ！</p>
//         </div>
//       )
//     },
//   ];

//   return (
//     <div style={{ backgroundImage: currentIndex === 2 ? `url('/images/img_collection.png')` : `url('/images/messages/bg_message.png')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="mx-auto min-h-screen">
//         <main className="p-4">
//           <section className="mb-8" aria-labelledby="point-card-section">
//             <div className='mx-auto h-auto test'>
//               {currentIndex == 1 && <Image
//                 src="/images/img_house.png"
//                 alt="おうち"
//                 width={300}
//                 height={300}
//                 className="mx-auto h-auto mb-5"
//               />}
//               <InformationPanel
//                 items={items}
//                 currentIndex={currentIndex}
//                 onNext={handleNext}
//                 withShadow
//                 className="w-full flex flex-col h-[75%] block mb-5"
//                 style={{position: "relative", top: "100px", overflow: "visible"}}
//               />
//               <div className="mx-auto flex flex-col gap-3 max-w-[320px] text-center">
//                 <Button className="rounded-full">つぎへ</Button>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   )
// }
