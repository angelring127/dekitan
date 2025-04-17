'use client'
import { useRouter } from "next/navigation";
// import { Button } from '@/components/common/Button'
import { useEffect, useState, useRef } from 'react'
import { apiClient } from '@/services/api'
import Image from "next/image";
import { useAuthStore } from "@/store/auth";
import { useGlobalStore } from "@/store/info";
type Task = {
  id: number;
  title: string;
  // status: number;
  category: number;
  point: number;
  // updated_at?: string
  finished_at: string;
};

export default function InitPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const hasFetched = useRef(false);
  const volatileToken = useAuthStore.getState().token
  const playerId = useGlobalStore.getState().playerId
  const [month, setMonth] = useState("")
  const [points, setPoints] = useState(0)

  useEffect(() => {
    if(!(volatileToken && playerId)) {
      router.push('/login')
    }
    apiClient.post('account/profile/player/get', {
      volatile_token: volatileToken,
      player_id: playerId,
    })
    .then((res) => {
      setPoints(res.data.data.total_point)
    })

    const date = new Date()
    setMonth(date.getFullYear() + "-" + date.getMonth())

    if (hasFetched.current) return;
    hasFetched.current = true;

    apiClient.post('event/task/histories', {
      volatile_token: volatileToken,
      player_id: playerId,
      year: date.getFullYear(),
      month: (date.getMonth()+1),
    })
    .then((res) => {
      setTasks(res.data.data.list);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  const getStrMonth = (type: string) => {
    const date = new Date(Number(month.split("-")[0]), Number(month.split("-")[1]) + 1)

    switch(type) {
      case 'now':
        return date.getMonth() + "月"
      case 'sub':
        return (date.getMonth() - 1) + "月"
      case 'add':
        return (date.getMonth() + 1) + "月"
    }
  }

  const selectMonth = (type: string) => {
    const [yearStr, monthStr] = month.split("-");
    const year = Number(yearStr);
    const monthIndex = Number(monthStr); // 0-based
  
    const date = new Date(year, monthIndex);
  
    if(type === 'sub') {
      date.setMonth(date.getMonth() - 1);
    } else if(type === 'add') {
      date.setMonth(date.getMonth() + 1);
    }
  
    // 月は0始まりなので、+1して表示用に変換
    setMonth(date.getFullYear() + "-" + date.getMonth());
    apiClient.post('event/task/histories', {
      volatile_token: volatileToken,
      player_id: playerId,
      year: date.getFullYear(),
      month: (date.getMonth()+1),
    })
    .then((res) => {
      setTasks(res.data.data.list);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const dateFormat = (date: string) => {
    const temp_date = new Date(date)
    temp_date.setMonth(temp_date.getMonth()+1)
    return temp_date.getFullYear() + " " + temp_date.getMonth() + "/" + temp_date.getDate()
  }

  const categoryImage = (category: number) => {
    switch(category) {
      case 1: 
        return "/images/todolist/icon_st_y.png"
      case 2:
        return "/images/todolist/icon_st_b.png"
      case 3:
        return "/images/todolist/icon_st_lg.png"
      case 4:
        return "/images/todolist/icon_st_r.png"
      case 5:
        return "/images/todolist/icon_st_p.png"
      case 6:
        return "/images/todolist/icon_st_e.png"
      default:
        return "/images/todolist/icon_st_y.png";
    }
  }

  // const [dialogContent, setDialogContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect((): void => {
    const dialogElement = dialogRef.current
    if (!dialogElement) {
      return
    }
    if (isOpen) {
      if (dialogElement.hasAttribute('open')) {
        return
      }
      dialogElement.showModal()
    } else {
      if (!dialogElement.hasAttribute('open')) {
        return
      }
      dialogElement.close()
    }
  }, [isOpen])

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-cyan-300 bg-[url('/images/todolist/dekita_list_BG.png')] bg-cover bg-center bg-no-repeat font-db">
      <div className="flex flex-col h-[844px]  overflow-y-auto  justify-center">
        <div className="relative justify-center mt-10 flex-1 flex-col items-center p-4">
          <h1 className="bg-white text-green text-center text-2xl font-bold py-2">できたリスト</h1>
          <div className="bg-[#ffebe5] text-center text-2xl font-bold py-2 flex flex-row justify-around items-center">
            <div className="w-[50%] h-[50px] bg-white flex flex-row items-center rounded-sm">
              <div className="w-[50%] text-[10px]">これまでためた<br/>できたポイント</div>
              <div className="w-[50%] flex flex-row text-lg">{points}<p className="text-xs flex items-end">ポイント</p></div>
            </div>
            <button onClick={() => {setIsOpen(true)}} className="w-[45%] h-[30px] bg-white shadow-lg border border-[#00803a] rounded-full text-xs text-[#00803a]">できたカテゴリーについて</button>
          </div>
          <div className="flex justify-around text-white text-center text-2xl mb-5 font-bold w-[390px] bg-[#fbb03b] py-[20px]">
            <button onClick={() => selectMonth('sub')} className="text-[#f15a24]">{"<"}</button>
            <button onClick={() => selectMonth('sub')} className="bg-white text-black rounded-full px-8 py-2">{getStrMonth('sub')}</button>
            <p className="bg-[#f15a24] text-white text-black rounded-full px-8 py-2">{getStrMonth('now')}</p>
            <button onClick={() => selectMonth('add')} className="bg-white text-black rounded-full px-8 py-2">{getStrMonth('add')}</button>
            <button onClick={() => selectMonth('add')} className="text-[#f15a24]">{">"}</button>
          </div>
          {tasks && tasks.map((data) => (
            <div
              key={data?.id}
              className="flex flex-col w-[80%] p-2 shadow-lg mb-5 cursor-pointer bg-white mx-auto rounded-2xl"
            >
              <div className="flex flex-row items-center space-x-4 mt-3 mb-3">
                <h2 className="text-black-800">
                  <Image
                    src={categoryImage(data.category)}
                    alt="category"
                    width={100}
                    height={100}
                  />
                </h2>
                <div className="text-black-600 w-full">
                  <p className="text-xs">
                    {dateFormat(data.finished_at)}にできた！
                  </p>
                  <h3 className="font-bold">
                    {data.title}
                  </h3>
                </div>
                <h2 className="text-end">
                  <Image
                    src={`/images/todolist/list_${data.point}pt.png`}
                    alt="point"
                    width={120}
                    height={100}
                  />
                </h2>
              </div>
            </div>
          ))}
        </div>

        <dialog ref={dialogRef} className="max-w-[430px] w-[80%] rounded-2xl relative overflow-visible">
          <Image
            src={`/images/todolist/close_icon.png`}
            alt="stone"
            width={50}
            height={50}
            style={{
              position: "absolute",
              top: "-3%",
              right: "-5%",
            }}
            onClick={() => setIsOpen(false)}
          />
          <div className="rouned-2xl overflow-y-scroll scrollbar-hide max-h-[95vh]">
            <div className="flex justify-center mx-auto py-2 text-white rounded-b-lg bg-[#f15a24] w-[60%]">できたカテゴリーについて</div>
            <div className="flex justify-center">
              できたんのワクワクワールドでは、できた！の<br/>
              カテゴリーをつぎの6つに分るいしています
            </div>
            <div className="p-5 gap-3">
              <div className="bg-[#ffebe5] p-3 flex flex-row rounded-2xl mb-3">
                <Image
                  src={`/images/todolist/stone_lg.png`}
                  alt="stone"
                  width={120}
                  height={120}
                />
                <div className="pl-3" style={{borderLeft: "black solid 1px"}}>
                  <h1 className="font-bold">生活できた！</h1>
                  <p className="text-[12px]">
                    学校のじゅんびやしゅくだいなど、学校生活にかん
                    するできたをあらわしています。
                  </p>
                </div>
              </div>
              <div className="bg-[#ffebe5] p-3 flex flex-row rounded-2xl mb-3">
                <Image
                  src={`/images/todolist/stone_b.png`}
                  alt="stone"
                  width={120}
                  height={120}
                />
                <div className="pl-3" style={{borderLeft: "black solid 1px"}}>
                  <h1 className="font-bold">学校できた！</h1>
                  <p className="text-[12px]">
                    生活しゅうかんやおてつだい、ならいごとなど日び
                    の生活にかんするできたをあらわしています
                  </p>
                </div>
              </div>
              <div className="bg-[#ffebe5] p-3 flex flex-row rounded-2xl mb-3">
                <Image
                  src={`/images/todolist/stone_r.png`}
                  alt="stone"
                  width={120}
                  height={120}
                />
                <div className="pl-3" style={{borderLeft: "black solid 1px"}}>
                  <h1 className="font-bold">運動できた！</h1>
                  <p className="text-[12px]">
                    スポーツや、からだを使ったことにかんするできた
                    をあらわしています。
                  </p>
                </div>
              </div>
              <div className="bg-[#ffebe5] p-3 flex flex-row rounded-2xl mb-3">
                <Image
                  src={`/images/todolist/stone_p.png`}
                  alt="stone"
                  width={120}
                  height={120}
                />
                <div className="pl-3" style={{borderLeft: "black solid 1px"}}>
                  <h1 className="font-bold">創造（そうぞう）できた！</h1>
                  <p className="text-[12px]">
                    楽や図画工作など創造せいやアートにかんするで
                    きたをあらわしています。
                  </p>
                </div>
              </div>
              <div className="bg-[#ffebe5] p-3 flex flex-row rounded-2xl mb-3">
                <Image
                  src={`/images/todolist/stone_e.png`}
                  alt="stone"
                  width={120}
                  height={120}
                />
                <div className="pl-3" style={{borderLeft: "black solid 1px"}}>
                  <h1 className="font-bold">なかよくできた！</h1>
                  <p className="text-[12px]">
                    人とのコミュニケーションにかんするできたをあら
                    わしています。
                  </p>
                </div>
              </div>
              <div className="bg-[#ffebe5] p-3 flex flex-row rounded-2xl mb-3">
                <Image
                  src={`/images/todolist/stone_y.png`}
                  alt="stone"
                  width={120}
                  height={120}
                />
                <div className="pl-3" style={{borderLeft: "black solid 1px"}}>
                  <h1 className="font-bold">スペシャルできた！</h1>
                  <p className="text-[12px]">
                    カテゴリーにかんけいなく、こどもが自しんででき
                    たと思うことや、ぐうぜんおこったできたをあらわ
                    しています
                  </p>
                </div>
              </div>
            </div>
          </div>
        </dialog>

{/* 
        <div className="w-full flex justify-center p-4">
          <Button
            variant="quinary"
            className="w-[180px] bg-white text-cyan-200 text-lg font-bold rounded-full shadow-[4px_4px_6px_rgba(0,0,0,0.3)]"
          >
            もどる
          </Button>

        </div> */}
      </div>
    </div>
  );
}