'use client'
import { useRouter } from "next/navigation";
import { Button } from '@/components/common/Button'
import { useEffect, useState, useRef } from 'react'
import { apiClient } from '@/services/api'
import Image from "next/image";
type Task = {
  id: number;
  title: string;
  status: number;
};

export default function InitPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    apiClient.post('event/task/gets', {
      volatile_token: "xxxxxxxxxxxxxxxxxxxxxxxxx",
      player_id: 1,
    })
      .then((res) => {
        setTasks(res.data.data.list);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-cyan-300 ">
      <div className="flex flex-col h-[844px]  overflow-y-auto ">
        <div className="relative justify-center mt-10 flex-1 flex-col items-center space-y-2 p-4">
          <h1 className="text-white text-center text-2xl mb-5 font-bold">2024/12/16 <br></br>やったリスト</h1>
          {tasks && tasks.map((data) => (
            <div
              key={data?.id}
              className="flex flex-col w-full p-2 bg-white shadow-lg rounded-[20px] border border-gray-600 mb-5 cursor-pointer"
              onClick={() => router.push(`/todolist/${data.id}`)}
            >
              <div className="flex flex-row w-[300px] items-center space-x-4 mt-3 mb-3">
                <h2 className="text-black-800">{data.id}</h2>
                <h2 className="text-black-600 font-bold">{data.title}</h2>
              </div>
            </div>
          ))}
        </div>


        <div className="w-full flex justify-center p-4">
          <Button
            variant="quinary"
            className="w-[180px] bg-white text-cyan-200 text-lg font-bold rounded-full shadow-[4px_4px_6px_rgba(0,0,0,0.3)]"
          >
            もどる
          </Button>

        </div>
      </div>
    </div>
  );
}