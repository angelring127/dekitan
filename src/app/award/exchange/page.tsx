'use client'
import React from 'react'
import { apiClient } from '@/services/api'
import { InformationPanel } from '@/components/common/InformationPanel'
import { getAwards } from '@/hooks/awardgetting'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/common/Button'
import { Award } from 'lucide-react'
export default function GetAward() {
  interface Award {
    id: number;
    title: string;
    description: string;
    image: string;
  }
  let name = "こうき";
  let point = 180;
  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      if(currentIndex === 3 && award){
        point = point -100;
        apiClient.post('award/item/collect', { item_id: award.id })
        .then((res)=>{
          console.log('res',res)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
      setCurrentIndex((prev) => prev + 1)
    }
  }
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const [award, setAward] = useState<Award | null>(null);
  const [initialItems, setInitialItems] = useState(() =>
  getAwards(handleNext, name, point, { item: "", description: "" })
);

useEffect(() => {
  localStorage.setItem('currentIndex', currentIndex.toString());
}, [currentIndex]);

  const items = initialItems?.items || []

  useEffect(() => {
    apiClient
      .post('/award/exchange/ordinary')
      .then((response) => {
        setAward(response.data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      const storedIndex = localStorage.getItem("currentIndex");
      if (storedIndex) {
        setCurrentIndex(parseInt(storedIndex, 10));
      }
  }, []);
  useEffect(() => {
    if (award) {
      setInitialItems(getAwards(handleNext, name, point, { item: award.title, description: award.description }));
    }
  }, [award]);


  let buttonText = "";
  let buttonColor = "";
  if (currentIndex === 0) {
    buttonText = "発明する";
    buttonColor = "bg-yellow-500";
  } else if (currentIndex === 3) {
    buttonText = "コレクションする";
    buttonColor = "bg-orange-500";
  } else if (currentIndex === 5) {
    buttonText = "もどる";
    buttonColor = "bg-gray-500";
  }
  
  const commonPanelStyle = {
    borderRadius: 20,
    position: 'relative' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  }


  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('${
        currentIndex === 4 ? '/images/img_cuppord.png' : '/images/messages/bg_message.png'
      }')`
    }}>
      <div className="relative w-[280px] mt-auto mb-4">
      {currentIndex === 0 && (
   <div className="relative inline-block">
    <Image
    src="/images/img_gemstone.png"
    alt="gemStone"
    width={300}
    height={300}
    className="gem_points"
  
  />
    <span className="absolute inset-0 flex items-center justify-center  text-3xl font-bold">
    {point} ポイント
   </span>
    </div>
      )}

{currentIndex === 1 && (
  <>
          <Image
          className='animate-vibrate-infinite cursor-pointer '
          src="/images/img_stonecrusher.png"
          alt="crusher"
          width= {400}
          height={400}
          onClick={handleNext}
        />
        </>
        )}
 {currentIndex === 2 && (
  <>
      <Image
            src="/images/img_yellow_star.png"
            alt="effect"
            width= {80}
            height={80}
            className="mx-auto absolute"
            style={{ top: '-35%', left:'10%' }}
          />
              <Image
            src="/images/img_yellow_star.png"
            alt="effect"
            width= {80}
            height={80}
            className="mx-auto absolute"
            style={{ top: '-45%', right:'0%' }}
          />
            <Image
            src={award?.image ?? '/images/default-image.png'}
            alt="award"
            width= {120}
            height={120}
            className="mx-auto absolute gem_points cursor-pointer animate-fade-in-up "
            style={{ top: '-30%', left:'50%' }}
            onClick={handleNext}
          />
          <Image
            src="/images/img_stonecrusher_effect.png"
            alt="effect"
            width= {100}
            height={100}
            className="mx-auto absolute rotate-90 "
            style={{ top: '-10%', left:'55%' }}
          />
             <Image
            src="/images/img_stonecrusher_effect.png"
            alt="effect"
            width= {100}
            height={100}
            className="mx-auto absolute rotate-45 "
            style={{ top: '-10%', left:'30%' }}
          />
              <Image
            src="/images/img_stonecrusher.png"
            alt="stoneCrusher"
            width= {400}
            height={400}
          />
        </>
        )}
 {currentIndex === 3 && (
  <>
        <Image
            src='/images/img_little_girl.png'
            alt="littlegirl"
            width= {50}
            height={50}
            className="mx-auto absolute"
            style={{ top: '-35%', right:'10%' }}
          />
           <Image
            src='/images/img_little_girl_2.png'
            alt="littlegirl"
            width= {50}
            height={50}
            className="mx-auto absolute"
            style={{ top: '-35%', left:'0%' }}
          />
           <Image
             src={award?.image ?? '/images/default-image.png'}
            alt="award"
            width= {150}
            height={150}
            className='gem_points absolute animate-fade-in-up'
            style={{ top: '-15%', left:'20%' }}
          />
        </>
        )}
         {currentIndex === 4 && (
  <>
    <Image
            src="/images/img_yellow_star.png"
            alt="effect"
            width= {80}
            height={80}
            className="mx-auto absolute"
            style={{ top: '-50%', right:'20%' }}
          />
              <Image
            src="/images/img_yellow_star.png"
            alt="effect"
            width= {80}
            height={80}
            className="mx-auto absolute"
            style={{ top: '-80%', left:'20%' }}
          />
                   <Image
            src="/images/img_little_collection_animal.png"
            alt="effect"
            width= {120}
            height={120}
            className="mx-auto absolute"
            style={{ top: '50%', right:'-20%' ,zIndex:'1'}}
          />

           <Image
            src={award?.image ?? '/images/default-image.png'}
            alt="award"
            width= {130}
            height={130}
            className='mx-auto absolute cursor-pointer collection_self'
            style={{ top: '-50%', left:'0%' }}
            onClick={handleNext}
          />
        </>
        )}

{currentIndex === 5 && (
  <>
           <Image
            src={award?.image ?? '/images/default-image.png'}
            alt="award"
            width= {300}
            height={300}
            className='gem_points'
          />
        </>
        )}
<div className="relative w-full flex flex-col items-center">
{(currentIndex === 0 || currentIndex === 1 || currentIndex === 2) && (
  <Image
    src="/images/img_little_rat.png"
    alt="little_rat"
    width={100}
    height={100}
    className="absolute animate-glitter-infinite"
    style={{ right: '3%' }}
  />
)}

<InformationPanel
    items={items.slice(0)}
    currentIndex={currentIndex}
    background="transparent"
    withShadow
    style={commonPanelStyle}
    className="my-4 mt-20 mb-10 flex flex-col items-center justify-center"
  >

    {buttonText && (
      <Button
        className={`text-lg font-bold mt-4 ${buttonColor}`}
        onClick={() => {
          if (currentIndex === items.length - 1) {
            handleBack();
          } else {
            handleNext();
          }
        }}
      >
        {buttonText}
      </Button>
    )}
  </InformationPanel>
  {currentIndex === 4 &&
  <Button
        className={`text-lg font-bold mt-4  ${buttonColor}`}
        onClick={()=>setCurrentIndex(0)}
      >
     いえにもどる
      </Button>}
</div>
      </div>
    </div>
  );
}


