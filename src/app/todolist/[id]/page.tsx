'use client'
import { useRouter } from "next/navigation";
import { Button } from '@/components/common/Button'
import { useState } from 'react'
import { apiClient } from '@/services/api'
import { useGlobalStore } from "@/store/info";
import Image from "next/image";

export default function InitPage() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0)
  const { name } = useGlobalStore();

  const reportomikuji = {
    "id": 1234,
    "theme": "空にあるもの",
    "answers": [
      "おもしろい形の雲を見つけた",
      "飛んでいるものみつけた",
      "一番星みつけた",
      "ほかのことをおしえてあげる！"
    ],
    "answer": [
      "おもしろい形の雲を見つけた",
    ],
    "text": "自由入力した結果",
    "status": 1
  }

  const previous = () => {
    if (currentIndex === 0) {
      router.push('/todolist')
    } else {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if(currentIndex < 1){
      setCurrentIndex((prev) => prev + 1)
    }
  }
  return (
    <div className="mx-auto flex h-auto w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col h-auto">
        <div className="relative w-[350px] mt-10 h-[360px] ">
          <Image
            src="/images/img_todolist.png"
            alt="character"
            width={400}
            height={400}
            className="absolute top-0 left-0"
          />
        </div>
        {currentIndex === 0 && (
          <div className="m-5 p-4 common_panel_style justify-center w-[300px] font-bold mt-10 text-center border-20px rounded-[10px]">
            <span className="m-3">
              ねえ、ねえ！ {name} くんが 、<br></br>[おさらあらい] ができたんだよ！<br></br>すごいね！
            </span>
          </div>
        )}

        {currentIndex === 1 && (
          <>
            <div className="flex flex-col items-center justify-center w-full">
            <div className="m-5 p-4 common_panel_style justify-center w-[300px] font-bold mt-10 text-center border-20px rounded-[10px]">
            <span className="m-3">
              ねえ、ねえ！ {name} くんが 、<br></br>空にあるものを発見できたんだよ！<br></br>すごいね！
            </span>
          </div>

              <div className="mt-5 p-4 common_panel_style w-[300px] font-bold text-center rounded-[10px]">
                <div className="flex flex-col items-start gap-2 m-3">
                  {reportomikuji?.answers?.map((answer, index) => (
                    <label key={index} className="flex items-center gap-2 m-1">
                      <input
                        type="checkbox"
                        value={answer}
                        disabled
                        checked={index === 0}
                      />
                      <span
                        className={index === 0 ? "text-red-500 font-bold" : ""}
                        dangerouslySetInnerHTML={{ __html: answer }}
                      />
                    </label>
                  ))}
                </div>

                <input
                  disabled
                  type="text"
                  placeholder={reportomikuji.text}
                  className="border p-4 w-full h-[60px] rounded-md text-lg bg-gray-100"
                />
              </div>
            </div>

          </>

        )}
        <div className="relative flex flex-col items-center justify-center mt-10">
          <Button
            variant="quinary"
            className="w-[250px] shadow-md pr-10 bg-red-500 text-lg font-bold rounded-full border-2 border-white"
            onClick={handleNext}
          >
            めちゃすごい！3pt
          </Button>


          <Image
            src="/images/img_great_job.png"
            alt="greatjob"
            width={50}
            height={50}
            className="absolute right-10 rounded-full bg-white border-2 border-violet-500"
          />
        </div>
      </div>
      <Button variant="quinary" className="w-[250px] m-10 shadow-md shadow-gray-400 bg-white text-black-500 text-lg font-bold rounded-l-full rounded-r-full" onClick={previous}>
        もどる
      </Button>
    </div>
  );

}