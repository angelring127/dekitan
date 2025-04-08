// 'use client'

// import { useState, useEffect } from 'react'
// import { InformationPanel } from '@/components/common/InformationPanel'
// import { useInitialItems } from '@/hooks/useInitialItems'
// import Image from 'next/image'
// import { Button } from '@/components/common/Button'

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
//       id: 'machine',
//       content: (
//         <div className="text-center">
//           <p>原石をマシンに入れてね！</p>
//           <p>こうきくんのできたがぼくの</p>
//           <p>アイデアのエネルギーなんだ</p>
//         </div>
//       )
//     },
//     {
//       id: 'item',
//       content: (
//         <div className="text-center">
//           <p>できたよー！</p>
//           <p>アイテムにさわってみて</p>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div style={{ backgroundImage: `url('/images/messages/bg_message.png')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="mx-auto min-h-screen">
//         <main className="p-4">
//           <section className="mb-8" aria-labelledby="point-card-section">
//             <div className='mx-auto h-auto'>
//               { currentIndex === 0 && <Image
//                   src="/images/effect.png"
//                   alt="おうち"
//                   width={200}
//                   height={200}
//                   className="mx-auto h-auto mb-5 animate-shrink-and-move-gacha"
//                 />
//               }
//               { currentIndex === 1 && 
//                 <a href="/tutorial/collection">
//                   <Image
//                     src="/images/effect.png"
//                     alt="おうち"
//                     width={200}
//                     height={200}
//                     className="mx-auto h-auto mb-5 animate-shrink-and-move-item"
//                   />
//                 </a>
//               }
//               <Image
//                 src="/images/gacha.png"
//                 alt="おうち"
//                 width={400}
//                 height={400}
//                 className="mx-auto h-auto mb-5"
//               />
//               <InformationPanel
//                 items={items}
//                 currentIndex={currentIndex}
//                 onNext={handleNext}
//                 withShadow
//                 className="w-full flex flex-col h-[75%] block mb-5"
//               />
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   )
// }
