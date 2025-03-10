'use client'
import React, { useState, useEffect } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { myCollection } from '@/hooks/myCollection'
import { Button } from '@/components/common/Button'
import { useGlobalStore } from "@/store/info";
import Image from 'next/image'
import { useRouter } from "next/navigation";

export default function MyCollections() {
  const { mycollection } = useGlobalStore();
  const router = useRouter();

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const storedIndex = localStorage.getItem("currentIndex");
    if (storedIndex) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }
  }, []);

  const [initialItems, setInitialItems] = useState(() => myCollection(mycollection ?? { title: "", description: "" }));

  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndex.toString());
  }, [currentIndex]);

  const items = initialItems?.items || [];

  let buttonText = "";
  let classname = "";
  let style = {};

  if (currentIndex === 0) {
    buttonText = "ホームにもどる";
    classname = 'relative h-[700px] w-[390px] mt-10  bg-cover bg-center bg-no-repeat mt-auto mb-4';
    style = {
      backgroundImage: `url('/images/img_cuppord.png')`,
    };

  } else if (currentIndex === 1) {
    buttonText = "もどる";
    classname = 'relative w-[390px] mt-auto mb-4';
    style = {
      background:`transparent`,
    };
  }

  return (
    <div 
      className={`mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden ${currentIndex === 1 ? 'bg-cover bg-center bg-no-repeat' : ''}`} 
      style={currentIndex === 1 ? { backgroundImage: `url('/images/messages/bg_message.png')` } : { background: 'white' }}
    >
      <div className={classname} style={style}>
        {currentIndex === 0 && (
          <>
            <Image
              src={mycollection?.image ?? '/images/default-image.png'}
              alt="award"
              width={150}
              height={150}
              onClick={handleNext}
              className="collection_self relative cursor-pointer"
              style={{ bottom: '-50%', left: '10%' }}
            />  
            <Image
              src="/images/img_yellow_star.png"
              alt="effect"
              width={80}
              height={80}
              className="absolute"
              style={{ bottom: '50%', right: '30%' }}
            />
            <Image
              src="/images/img_yellow_star.png"
              alt="effect"
              width={80}
              height={80}
              className="mx-auto absolute z-10"
              style={{ bottom: '30%', right: '20%' }}
            />
            <Image
              src="/images/img_little_collection_animal.png"
              alt="little_rat"
              width={140}
              height={140}
              className="absolute "
              style={{ bottom: '0%', right: '-5%' }}
            />
          </>
        )}
        {currentIndex === 1 && (
          <Image
            src={mycollection?.image ?? '/images/default-image.png'}
            alt="award"
            width={150}
            height={150}
            className="gem_points relative animate-fade-in-up"
            style={{ bottom: '130%', left: '30%' }}
          />
        )}

        <div className="absolute w-full flex flex-col items-center mb-20 mt-20" style={{ bottom: '0%'}}> 
          <InformationPanel
            items={items.slice(0)}
            currentIndex={currentIndex}
            background="transparent"
            withShadow
            className="my-4 w-[350]   mb-120 flex flex-col items-center justify-center common_panel_style"
          >
            {currentIndex === 1 && (
              <Button
                className="text-lg font-bold mt-4 text-black bg-gray-300 rounded-l-full rounded-r-full"
                onClick={handlePrevious}
              >
                {buttonText}
              </Button>
            )}
          </InformationPanel>
        </div>
      </div>
      {currentIndex === 0 && (
        <Button
          className="text-lg font-bold relative mt-4 text-black bg-gray-300 rounded-l-full rounded-r-full"
          onClick={() => { router.push('/') }}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
