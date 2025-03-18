import { Button } from '@/components/common/Button';
import type { InformationItem } from '@/components/common/InformationPanel/types';
export const getAwards = (onNext: () => void, name: string, points: number, mycollection: { title: string; description: string }) => {

  const items: InformationItem[] = [
    {
      id: 'step0',
      content: (
        <div className="flex flex-col items-center gap-4">
          <br></br>
          <span className="whitespace-pre-line text-center text-1xl font-bold">
            {name}くん ポイントが{points}ptたまったよ!<br /><br />1回発明ができるよ!
          </span>

          <Button  variant="yelloish" className='text-lg font-bold mt-4  rounded-l-full rounded-r-full'
            onClick={() => onNext()}
          >
             発明する
          </Button>
        </div>
      ),
    },
    {
      id: 'step1',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-1xl font-bold">
            原石をマシンに入っていくよ！ <br />できたの原石がぼくのアイデアのエネルギーなんだ
          </span>
        </div>
      ),
    },
    {
      id: 'step2',
      content: (
        <div className="flex flex-col items-center gap-3">
          <span className="whitespace-pre-line text-center text-1xl font-bold">
            できたよー！ <br />アイテムにさわってみて
          </span>
        </div>
      ),
    },
    {
      id: 'step3',
      content: (
        <div className="flex flex-col items-center gap-4">
          <br></br>
          <span className="whitespace-pre-line text-center text-2xl font-bold">
            {mycollection?.title}
          </span>
          <br></br>
          <span
            className="whitespace-pre-line text-center text-xl font-bold"
            dangerouslySetInnerHTML={{ __html: mycollection?.description || "" }} />
          <Button className='text-white text-lg font-bold mt-4 bg-orange-500 rounded-l-full rounded-r-full'
            onClick={() => onNext()}
          >
            コレクションする
          </Button>
        </div>
      ),
    },
  ];

  return {
    items,
  };
};
