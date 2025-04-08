'use client'

import { useState, useEffect } from 'react';
import { InformationPanel } from '@/components/common/InformationPanel';
import { ChildRegist } from '@/hooks/childRegist';
import { Button } from '@/components/common/Button';
import { useGlobalStore } from "@/store/info";
import { useRouter } from "next/navigation";
import { apiClient } from '@/services/api';
import { PLAYER_HONORIFIC_TITLE } from '@/constants';

export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { childinfo, setChildInfo } = useGlobalStore(); 
  const router = useRouter();

  const handleNext = async () => {
    if (currentIndex === 0) {
      await updateChild()
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

  function gradeToBirthdate(grade: string): string {
    const date = new Date();
    const year = date.getFullYear()
    const ageMap: Record<string, number> = {
        "年少": 3, "年中": 4, "年長": 5,
        "小学1年生": 6, "小学2年生": 7, "小学3年生": 8, "小学4年生": 9, "小学5年生": 10, "小学6年生": 11
    };

    // 4月2日時点の年齢から生まれた年を算出
    const birthYear = year - ageMap[grade];

    return `${birthYear}-04-02`;
  }

  const updateChild = async () => {
    await apiClient.post("/api/account/profile/player/put", {
      "volatile_token": "",
      "player_id": "",
      "nickname": childinfo.name,
      "birth_day": gradeToBirthdate(childinfo.schoolYear),
      "honoric_title": PLAYER_HONORIFIC_TITLE.filter(e => e.label === childinfo.suffix)[0]['value'],
    }).then((res) => {

    })
  }

  useEffect(() => {
    apiClient.post("/api/account/profile/player/get", {
      "volatile_token": "",
      "player_id": "",
    }).then((res) => {
      setChildInfo("name", res.data.nickname)
      setChildInfo("honoric_title", PLAYER_HONORIFIC_TITLE.filter(e => e.value === res.data.profile[0].honorific_title)[0]['label'])
    })
  }, [])

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