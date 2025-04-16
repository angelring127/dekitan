'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/common/Button'
import { useEffect, useState, useRef } from 'react'
import { apiClient } from '@/services/api'
import { useAuthStore } from '@/store/auth'
import { useGlobalStore } from '@/store/info'
type Task = {
  id: number
  title: string
  updated_at: string
}

export default function InitPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const hasFetched = useRef(false)
  const volatileToken = useAuthStore.getState().token
  const playerId = useGlobalStore.getState().playerId

  useEffect(() => {
    if(!(volatileToken && playerId)) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
    apiClient
      .post('event/task/gets', {
        volatile_token: volatileToken,
        player_id: playerId,
        status: 2,
      })
      .then((res) => {
        setTasks(res.data.data.list)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [playerId, volatileToken])

  const dateFormat = (date: string, type: string) => {
    const current_date = new Date(date)
    switch(type) {
      case 'year':
        return current_date.getFullYear()
      case 'month-day':
        return current_date.getMonth() + "/" + current_date.getDate()
    }
  }

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col w-[350px] h-[844px] bg-cyan-100 overflow-y-auto ">
        <div className="w-full bg-white text-center py-2 text-2xl font-bold">未承認リスト</div>

        <div className="relative mt-10 flex-1 flex-col items-center space-y-2 p-4">
          {tasks &&
            tasks.map((data) => (
              <div
                key={data?.id}
                className="flex flex-col w-full p-2 bg-white shadow-lg rounded-[20px] border border-gray-600 mb-5 cursor-pointer"
                onClick={() => router.push('/')}
              >
                <div className="flex flex-row items-center space-x-4 mt-3 mb-3">
                  <h2 className="text-black-800">
                    {dateFormat(data.updated_at,'year')}
                    <br />
                    {dateFormat(data.updated_at,'month-day')}
                  </h2>
                  <h2 className="text-black-600 font-bold">{data.title}</h2>
                </div>
              </div>
            ))}
        </div>

        <div className="w-full flex justify-center p-4">
          <Button
            variant="quinary"
            className="w-[120px] shadow-md shadow-gray-400 bg-white text-cyan-200 text-lg font-bold rounded-l-full rounded-r-full"
            onClick={() => router.push('/room')}
          >
            もどる
          </Button>
        </div>
      </div>
    </div>
  )
}
