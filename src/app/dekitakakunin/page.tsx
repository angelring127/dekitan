'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import Image from 'next/image';
import { apiClient } from "@/services/api";
import { TaskStatus } from '@/constants';

export default function InitPage() {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    useEffect(() => {
        const savedIndex = localStorage.getItem('currentIndex');
        setCurrentIndex(savedIndex ? parseInt(savedIndex, 10) : 0);
    }, []);

    useEffect(() => {
        if (currentIndex !== null) {
            localStorage.setItem('currentIndex', currentIndex.toString());
        }
    }, [currentIndex]);

    const updateStatus = async () => {
        try {
            await apiClient.post("/event/task/put", {
                volatile_token: "xxxx",
                player_id: 1,
                task_id: 1,
                status: TaskStatus.FINISHED
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (currentIndex === null) return null;

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            {currentIndex !== 0 && (
                <Image
                    src="/images/img_character.png"
                    alt="img_character"
                    width={120}
                    height={120}
                    className="mt-20 w-full max-w-[120px] object-contain z-0"
                />
            )}

            {currentIndex === 0 && (
                <div className="relative min-h-auto w-[320px] flex flex-col items-center bg-cyan-300 justify-center">
                    <div className="relative m-5 p-4 common_panel_style justify-center w-[300px] font-bold mt-20 text-center border-20px rounded-[10px] z-10">
                        <span className="m-3">
                            <h1 className='text-2xl font-bold text-red-500'>おさらあらい</h1><br />
                            <h1 className='text-2xl font-bold'>できたかな？</h1>
                        </span>
                    </div>

                    <Image
                        src="/images/img_character.png"
                        alt="img_character"
                        width={120}
                        height={120}
                        className="absolute top-[50px] right-10 translate-x-1/2 -translate-y-1/2 z-0"
                    />

                    <Button
                        variant="primary"
                        className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mt-10"
                        onClick={() => updateStatus()}
                    >
                        できた！
                    </Button>
                    <Button
                        variant="primary"
                        className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mt-10"
                        onClick={() => setCurrentIndex(1)}
                    >
                        チャレンジ中
                    </Button>
                    <Button
                        variant="primary"
                        className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mt-10"
                        onClick={() => setCurrentIndex(2)}
                    >
                        きょうはやってない
                    </Button>
                    <Button
                        variant="primary"
                        className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mt-10 mb-3"
                        onClick={() => setCurrentIndex(3)}
                    >
                        ほかのことにする
                    </Button>
                </div>
            )}

            {currentIndex === 1 && (
                <div className='flex flex-col mt-10 items-center'>
                    <h1 className='text-2xl font-bold'>がんばって</h1><br />
                    <h1 className='text-2xl font-bold'>つづけてね</h1>
                    <Button
                        variant="primary"
                        className="text-lg w-[100px] bg-blue-500 text-white font-bold rounded-l-full rounded-r-full mt-10 mb-3"
                        onClick={() => setCurrentIndex(0)}
                    >
                        もどる
                    </Button>
                </div>
            )}

            {currentIndex === 2 && (
                <div className='flex flex-col items-center  mt-10'>
                    <h1 className='text-2xl font-bold'>わかった！、</h1><br />
                    <h1 className='text-2xl text-center font-bold'>また今度 <br></br>チャレンジしてね</h1>
                    <Button
                        variant="primary"
                        className="text-lg w-[100px] bg-blue-500 text-white font-bold rounded-l-full rounded-r-full mt-10 mb-3"
                        onClick={() => setCurrentIndex(0)}
                    >
                        もどる
                    </Button>
                </div>

            )}

            {currentIndex === 3 && (
                <div className="relative m-5 p-4 common_panel_style justify-center w-[300px] font-bold mt-20 text-center border-20px rounded-[10px] z-10">
                    <span className="m-3">
                        <h1 className='text-2xl font-bold text-black-500'>[おさらあらい]をやめて違うことにするの？</h1><br />
                        <div className='flex flex-row'>
                            <Button
                                variant="primary"
                                className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full  mb-3"
                                onClick={() => setCurrentIndex(0)}
                            >
                                はい
                            </Button>
                            <Button
                                variant="primary"
                                className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mb-3"
                                onClick={() => setCurrentIndex(0)}
                            >
                                いいえ
                            </Button>
                        </div>
                    </span>
                </div>
            )}
        </div>
    );
}
