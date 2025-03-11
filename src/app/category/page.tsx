'use client'
import type { InformationItem } from '@/components/common/InformationPanel/types';
import { InformationPanel } from '@/components/common/InformationPanel'
import { Button } from '@/components/common/Button'
import Image from 'next/image';
import { useRouter } from "next/navigation";
export default function CategoryList() {
    const router = useRouter();
    const header: InformationItem[] = [
        {
            id: 'header',
            content: (
                <div className="flex  flex-row items-center gap-1">
                    <Image
                        src="/images/img_gemstone.png"
                        alt="できたカテゴリーについて"
                        width={65}
                        height={65}
                    />
                    <h1 className="text-xl text-red-500 font-bold">できたカテゴリーについて</h1>
                </div>
            ),
        }
    ];

    const categories = [
        {
            title: "せいかつできた！",
            description: "生活習慣やおてつだい、習い事など日々の生活に関するできたを表しています。",
            imageSrc: "/images/img_gemstone.png",
        },
        {
            title: "学校でさた!",
            description: "学校の準備や宿題など、学校生活に関するできたを表しています。",
            imageSrc: "/images/img_green_gemstone.png",
        },
        {
            title: "うんどうできた!",
            description: "スポーツや、からだを使ったことに関するできたを表しています。",
            imageSrc: "/images/img_gemstone.png",
        },
        {
            title: "創造できた!",
            description: "音楽や図画工作など創造性やアートに関するできたをしています。",
            imageSrc: "/images/img_green_gemstone.png",
        },
        {
            title: "なかよくできた!",
            description: "人とのコミュニケーションに関するできたを表明しています。",
            imageSrc: "/images/img_gemstone.png",
        },
        {
            title: "スペシャルできた!",
            description: "カテゴリーに関係なく、こどもが自身でてきたと思うことや、偶然起こったできた表しています。",
            imageSrc: "/images/img_green_gemstone.png",
        }
    ];

    const items: InformationItem[] = [
        {
            id: '0',
            content: (
                <div className="flex flex-col items-center gap-4">
                    <h2 className="mt-10 text-1xl font-bold">ハローファミリーでは、できた!のカテゴリーを以下の6つに分類しています。 </h2>
                    <ul className="space-y-4">
                        {categories.map((category, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <Image
                                    src={category.imageSrc}
                                    alt="bullet icon"
                                    width={50}
                                    height={50}
                                    className="shrink-0"
                                />

                                <div>
                                    <h2 className="text-sm font-bold">{category.title}</h2>
                                    <p className="text-sm font-bold">{category.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        }
    ];

    return (
        <div className="mx-auto flex  w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <InformationPanel
                items={header}
                currentIndex={0}
                withShadow
                className="my-2 w-[370px] p-0  flex flex-col items-center justify-center common_panel_style rounded-l-full rounded-r-full"
            />
            <InformationPanel
                items={items}
                currentIndex={0}
                withShadow
                className="my-4  pb-20 w-[340px]  flex flex-col items-center justify-center common_panel_style"
            />
            <Button
                variant="tertiary"
                className="text-lg font-bold rounded-l-full rounded-r-full mb-10"
                onClick={() => { router.push('/calender') }}
            >ホームにもどる
            </Button>
        </div>
    );
};
