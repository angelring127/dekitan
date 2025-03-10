import type { InformationItem } from '@/components/common/InformationPanel/types';
export const myCollection = (mycollection: { title: string; description: string }) => {
    const items: InformationItem[] = [
        {
            id: '0',
            content: (
                <div className="flex flex-col items-center gap-4">
                    <span className="whitespace-pre-line text-center text-1xl font-bold">
                        ひとつのコレクションがふえた!
                    </span>
                </div>
            ),
        },
        {
            id: '1',
            content: (
                <div className="flex flex-col items-center gap-4">
                    <span className="whitespace-pre-line text-center text-2xl font-bold">
                        {mycollection?.title}
                    </span>
                    <span
                        className="whitespace-pre-line text-center text-xl font-bold"
                        dangerouslySetInnerHTML={{ __html: mycollection?.description || "", }} />
                </div>
            ),
        }
    ];

    return {
        items,
    };
};
