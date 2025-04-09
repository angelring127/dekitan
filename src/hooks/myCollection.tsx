import type { InformationItem } from '@/components/common/InformationPanel/types';
import type { CollectionItem } from "@/store/info";

export const myCollection = (singleCollectionItem: CollectionItem | null) => {
    const items: InformationItem[] = [
        {
            id: '0',
            content: (
                <div className="flex flex-col items-center gap-4">
                    <span className="whitespace-pre-line text-center text-1xl font-bold">
                        ひとつのコレクションが<br></br>ふえたね!
                    </span>
                </div>
            ),
        },
        {
            id: '1',
            content: (
                <div className="flex flex-col items-center gap-4 w-[80%]" style={{marginTop: "50px"}}>
                    <span className="whitespace-pre-line text-center text-2xl font-bold">
                        {singleCollectionItem?.title}
                    </span>
                    <span
                        className="whitespace-pre-line text-center text-xl font-bold"
                        dangerouslySetInnerHTML={{ __html: singleCollectionItem?.description || "", }} />
                </div>
            ),
        }
    ];

    return {
        items,
    };
};
