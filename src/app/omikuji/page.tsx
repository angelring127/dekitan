'use client'
import { apiClient } from '@/services/api'
import { useState, useEffect } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { useOmikujiSteps } from '@/hooks/omikujisteps'
import Image from 'next/image'
import { Button } from '@/components/common/Button'
import {FORTUNE_PROGRESS} from '@/constants/index'
import { useRouter } from "next/navigation";
export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showOmikuji, setShowOmikuji] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showFinalPanel, setShowFinalPanel] = useState(false)
  const router = useRouter();
  interface Omikuji {
    id: number;
    theme: string;
    answers: string[];
    status: number;
  }
const [omikuji, setOmikuji] = useState<Omikuji | null>(null);
  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleOmikujiClick = () => {
    if (!showResult) {
      setShowResult(true)
    }
  }

  useEffect(() => {
     apiClient
       .post('/event/lot/get')
       .then((response) => {
        if(response.data.data.status ==FORTUNE_PROGRESS.UNREPORTED){
          setOmikuji(response.data.data);
        }
        else{
          router.push('./');
        }
       })
       .catch((error) => {
         console.error('Error:', error);
       });
   }, []);

   const initialItems = omikuji ? useOmikujiSteps(omikuji) : { items: [] };

  const items = initialItems?.items || []

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        setShowFinalPanel(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [showResult])

  const commonPanelStyle = {
    borderRadius: 20,
    position: 'relative' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  }


    return (
      <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
        <div className="relative flex w-full flex-1 flex-col items-center justify-center">
          <div
             className={`absolute  transform -translate-x-1/2 ${
                showResult ? 'animate-shrink-and-move z-0' : 'animate-shake-infinite cursor-pointer z-10'
              } top-20`}
            onClick={handleOmikujiClick}
            role="button"
            tabIndex={0}
            aria-label="おみくじをタップ"
          >
            <Image
              src="/images/img_omikuji.png"
              alt="おみくじ"
              width={300}
              height={300}
              className="mx-auto "
              style={{ top: '20%' }}
            />
          </div>
          {!showResult && (
            <>
               <Image
                    src="/images/img_yellow_star.png"
                    alt="おみくじ結果"
                    width={100}
                    height={100}
                    className="mx-auto absolute animate-glitter-infinite"
                    style={{ top: '5%', right:'40%' }}
                  />
                     <Image
                    src="/images/img_yellow_star.png"
                    alt="おみくじ結果"
                    width={80}
                    height={80}
                    className="mx-auto absolute animate-glitter-infinite"
                    style={{ top: '20%', right:'5%' }}
                  />
                   <Image
                    src="/images/img_little_girl.png"
                    alt="おみくじ結果"
                    width={80}
                    height={80}
                    className="mx-auto absolute animate-fade-in-up"
                    style={{ top: '40%', right:'5%' }}
                  /></>)}
               <Image
                  src="/images/img_little_girl_2.png"
                  alt="おみくじ結果"
                  width={80}
                  height={80}
                  className="mx-auto absolute animate-fade-in-up"
                  style={{ top: '5%', left:'5%' }}
                />
               
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-8 ${
              !showResult ? 'pointer-events-none' : 'z-20'
            }`}
          >
            {showResult && (
                <>
              <div className="animate-grow-and-center">
                <Image
                  src="/images/img_result.png"
                  alt="おみくじ結果"
                  width={450}
                  height={450}
                  className="mx-auto"
                />
              </div>
                 <Image
                  src="/images/img_little_girl_2.png"
                  alt="おみくじ結果"
                  width={80}
                  height={80}
                  className="mx-auto absolute animate-fade-in-up"
                  style={{ top: '5%', left:'5%' }}
                />
                <Image
                    src="/images/img_little_girl.png"
                    alt="おみくじ結果"
                    width={80}
                    height={80}
                    className="mx-auto absolute animate-fade-in-up"
                    style={{ top: '25%', right:'5%' }}
                  />
                </>
            )}
            {showFinalPanel && (
                <>
              <div className="animate-fade-in-up w-[280px]">
                <InformationPanel
                items={items.slice(0)}
                  currentIndex={currentIndex}
                  background="transparent"
                  withShadow
                  style={commonPanelStyle}
                />
              </div>
                  <Button
                  variant="quinary"
                  className="text-lg font-bold"
                  onClick={() => {
                    if (currentIndex === items.length - 1) {
                      router.push('./'); 
                    } else {
                      handleNext();
                    }
                  }}
                
                  >
                {currentIndex === items.length - 1 ? "できたんの部屋にもどる" : "次へ"}
                </Button>
                </>
            )}
          </div>
        </div>
      </div>
    )

}
