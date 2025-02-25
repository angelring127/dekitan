import type { InformationItem } from '@/components/common/InformationPanel/types'

export const useOmikujiSteps = (omikuji: { theme: string; answers: string[] }) => {

  const items: InformationItem[] = [
    {
      id: 'step2',
      content: (

        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-3xl font-bold">
          きょうはこれ !{'\n'}ハッピーテーマ{'\n'}
            {'\n'}{omikuji?.theme}
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
            <span className="whitespace-pre-line text-center text-1xl font-bold">
            {omikuji?.answers[0] || ''}
            </span>
            <span className="whitespace-pre-line text-center text-1xl font-bold">
            {omikuji?.answers[1] || ''}
            </span>
            <span className="whitespace-pre-line text-center text-1xl font-bold">
            {omikuji?.answers[2]|| ''}
            </span>
            <span className="whitespace-pre-line text-center text-1xl font-bold">
            {omikuji?.answers[3]|| ''}
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
            新しい発見があると いいね
            </span>
            <span className="whitespace-pre-line text-center text-3xl font-bold">
            何かみつけたらできたんにおしえてね！
            </span>
          </div>
        ),
        size: {
          width: '100%',
          height: 'auto',
        },
      },
  ]

  return {
    items,
  }
}
