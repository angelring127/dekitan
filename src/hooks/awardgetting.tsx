import type { InformationItem } from '@/components/common/InformationPanel/types';

export const getAwards = (onNext: () => void, name: string, points: number, award: { item: string; description: string}) => {

  const items: InformationItem[] = [
    {
      id: 'step0',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-3xl font-bold">
          {name}くん ポイントが{points}ptたまったよ!<br /><br />1回発明ができたよ!
          </span>
        </div>
      ),
      size: {
        width: '100%',
        height: 'auto',
      },
    },
    {
      id: 'step1',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-1xl font-bold">
            原石をマシンに入れてね！ <br /><br />こうきくんのできたがぼくのアイデアのエネルギーなんだ
          </span>
        </div>
      ),
      size: {
        width: '100%',
        height: 'auto',
      },
    },
    {
      id: 'step2',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-3xl font-bold">
            できたよー！ {'\n'}アイテムにさわってみて
          </span>
        </div>
      ),
      size: {
        width: '100%',
        height: 'auto',
      },
    },
    {
      id: 'step3',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-3xl font-bold">
            {award.item}
          </span>
          <span
            className="whitespace-pre-line text-center text-3xl font-bold"
            dangerouslySetInnerHTML={{ __html: award.description }}
          />
        </div>
      ),
      size: {
        width: '100%',
        height: 'auto',
      },

    },
    {
      id: 'step4',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-3xl font-bold">
      ひとつのコレクションがふえたよ!
          </span>
       
        </div>
      ),
      size: {
        width: '100%',
        height: 'auto',
      },

    },
    {
      id: 'step5',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-3xl font-bold">
            {award.item}
          </span>
          <span
            className="whitespace-pre-line text-center text-3xl font-bold"
            dangerouslySetInnerHTML={{ __html: award.description }}
          />
        </div>
      ),
      size: {
        width: '100%',
        height: 'auto',
      },
    }
  ];

  return {
    items,
  };
};
