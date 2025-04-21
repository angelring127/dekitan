'use client'
import React, { useEffect } from 'react'
import { apiClient } from '@/services/api'
import { InformationPanel } from '@/components/common/InformationPanel'
import { getAwards } from '@/hooks/awardGetting'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useGlobalStore } from '@/store/info'
import { useAuthStore } from '@/store/auth'

export default function GetAward() {
  const { name, points, singleCollectionItem, setPoints, decreasePoints, setSingleCollectionItem } =
    useGlobalStore()
  const router = useRouter()
  const volatileToken = useAuthStore.getState().token
  const playerId = useGlobalStore.getState().playerId
  const [showMachine, setShowMachine] = useState(true);
  const [showBag, setShowBag] = useState(true);
  const [showDekitan, setShowDekitan] = useState(true);
  const [showItem, setShowItem] = useState(false);

  const handleNext = () => {
    if (currentIndex === 0) {
      getAward()
    }

    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      decreasePoints(points - 100);
      router.push('/award/collect')
      apiClient
        .post('award/item/collect', {
          volatile_token: volatileToken,
          player_id: playerId,
          item_id: singleCollectionItem?.id,
        })
        .then((res) => {
          console.log('res', res)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }

    if(currentIndex === 1) {
      setTimeout(() => {
        setShowBag(false)
        setTimeout(() => {
          setShowMachine(false)
          setTimeout(() => {
            setShowDekitan(false)
            setTimeout(() => {
              setShowItem(true)
            }, 7000)
          }, 6000)
        }, 8000)
      }, 5000)
    }
  }

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const initialItems = getAwards(
    handleNext,
    name,
    points,
    singleCollectionItem ?? { title: '', description: '' }
  )
  const items = initialItems?.items || []

  const getAward = () => {
    apiClient
      .post('/award/exchange/ordinary', {
        volatile_token: volatileToken,
        player_id: playerId,
      })
      .then((response) => {
        setSingleCollectionItem(response.data.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    if(!(volatileToken && playerId)) {
      router.push('/login')
    }
    apiClient.post('account/profile/player/get', {
      volatile_token: volatileToken,
      player_id: playerId,
    })
    .then((res) => {
      setPoints(res.data.data.current_point)
    })
  }, [])

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative w-[390px] mb-4">
        {
          currentIndex === 0 && (
            <div className="relative inline-block" style={{ left: '12%', margin: '0' }}>
              <Image
                src="/images/img_gemstone.png"
                alt="gemStone"
                width={280}
                height={280}
                className="gem_points"
              />
              <span
                className="absolute 
      inset-0 flex items-center justify-center  text-3xl font-bold"
              >
                {points} ポイント
              </span>
              <Image
                src="/images/img_little_rat.png"
                alt="little_rat"
                width={130}
                height={130}
                className="absolute  z-10"
                style={{ bottom: '-45%', right: '-15%' }}
              />
            </div>
          )
        }
        {
          currentIndex === 1 && (
            <div className="">
              <div className='relative w-[390px] h-[844px]'>
                <Image
                  src="/images/award/machine_BG.png"
                  alt="bg"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
                <Image
                  src="/images/award/machine.png"
                  alt="gemStone"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
                <button type="button" onClick={handleNext}>
                  <Image
                    src="/images/award/animD1_dekitan.png"
                    alt="gemStone"
                    width={300}
                    height={300}
                    style={{
                      position: "absolute",
                      top: "30%",
                      right: "-15%"
                    }}
                  />
                </button>
              </div>
            </div>
          )
        }
        {currentIndex === 2 && (
          <div className="">
            <div className='relative w-[390px] h-[844px]'>
              <Image
                src="/images/award/animD2_BG.png"
                alt="bg"
                className='animate-spin'
                width={1000}
                height={1000}
                style={{
                  maxWidth: "none",
                  position: "absolute",
                  top: "-8%",
                  left: "-80%"
                }}
              />
              {showMachine && <Image
                src="/images/award/machine.png"
                alt="gemStone"
                fill
                style={{
                  objectFit: "contain",
                }}
              />}
              {!showMachine && <Image
                src="/images/award/animD3_machine.png"
                alt="gemStone"
                fill
                style={{
                  objectFit: "contain",
                }}
              />}
              {showBag && <Image
                src="/images/award/animD2_bag.png"
                alt="gemStone"
                width={150}
                height={150}
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "32%",
                  zIndex: 5
                }}
              />}
              {showBag && (
                <div className='flex flex-col'>
                  <Image src="/images/todolist/stone_b.png" alt="gemStone" width={50} height={50} className='animate-drop' style={{position: "absolute", top: "8%", left:"39%", animationDelay: "2s", zIndex: 4}}/>
                  <Image src="/images/todolist/stone_e.png" alt="gemStone" width={50} height={50} className='animate-drop' style={{position: "absolute", top: "8%", left:"44%", animationDelay: "2s", zIndex: 4}}/>
                  <Image src="/images/todolist/stone_lg.png" alt="gemStone" width={50} height={50} className='animate-drop' style={{position: "absolute", top: "8%", left:"39%", animationDelay: "2.5s", zIndex: 4}}/>
                  <Image src="/images/todolist/stone_p.png" alt="gemStone" width={50} height={50} className='animate-drop' style={{position: "absolute", top: "8%", left:"44%", animationDelay: "2.5s", zIndex: 4}}/>
                  <Image src="/images/todolist/stone_r.png" alt="gemStone" width={50} height={50} className='animate-drop' style={{position: "absolute", top: "8%", left:"39%", animationDelay: "3s", zIndex: 4}}/>
                  <Image src="/images/todolist/stone_y.png" alt="gemStone" width={50} height={50} className='animate-drop' style={{position: "absolute", top: "8%", left:"44%", animationDelay: "3s", zIndex: 4}}/>
                </div>
              )}
              {(!showBag && showMachine) && <Image
                src="/images/award/animD2_counter.png"
                alt="gemStone"
                width={80}
                height={80}
                style={{
                  position: "absolute",
                  top: "37%",
                  left: "41%"
                }}
              />}
              {showDekitan && <Image
                src="/images/award/animC3_dekitan.png"
                alt="gemStone"
                width={300}
                height={300}
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "-15%"
                }}
              />}
              {!showDekitan && <Image
                src="/images/award/animC4_dekitan.png"
                alt="gemStone"
                width={300}
                height={300}
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "-15%"
                }}
              />}
              {showItem && <Image
                src="/images/award/hatumei_item_02.png"
                alt="gemStone"
                width={200}
                height={200}
                className='cursor-pointer'
                onClick={handleNext}
                style={{
                  position: "absolute",
                  top: "31%",
                  left: "22%"
                }}
              />}
              {showItem && <Image
                src="/images/award/animD3_KIRA.png"
                alt="gemStone"
                width={300}
                height={300}
                className='cursor-pointer'
                onClick={handleNext}
                style={{
                  position: "absolute",
                  top: "25%",
                  left: "15%"
                }}
              />}
            </div>
          </div>
        )}

        <div className=" w-full flex flex-col items-center mb-20">
          <InformationPanel
            items={items.slice(0)}
            currentIndex={currentIndex}
            background="transparent"
            withShadow
            className="w-[320px] my-4 mt-20  flex flex-col items-center justify-center common_panel_style"
          ></InformationPanel>
        </div>
      </div>
    </div>
  )
}
