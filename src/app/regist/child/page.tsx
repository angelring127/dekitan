'use client'

import { useState } from 'react';
import { InformationPanel } from '@/components/common/InformationPanel';
import { ChildRegist } from '@/hooks/childRegist';
import { Button } from '@/components/common/Button';
import { useGlobalStore } from "@/store/info";
import { useRouter } from "next/navigation";

export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { childinfo, setChildInfo } = useGlobalStore(); 
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex === 0) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push('/');
    }
  };

  const { items } = ChildRegist({ childinfo, setChildInfo }); 

  const commonPanelStyle = {
    borderRadius: 20,
    position: 'relative' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };

  return (
    <div className="mx-auto flex h-[844px] w-[390px] items-center justify-center bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center w-full max-w-[320px]">
        <InformationPanel
          items={items}
          currentIndex={currentIndex}
          onNext={handleNext}
          background="transparent"
          withShadow
          style={commonPanelStyle}
          className="w-full flex flex-col h-[75%]"
        />
        
        <Button
          className="text-lg font-bold mt-4 bg-red-500 px-6 py-2 rounded-full"
          onClick={handleNext}
        >
          つぎへ
        </Button>
      </div>
    </div>
  );
}