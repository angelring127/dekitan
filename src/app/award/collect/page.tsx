import { Button } from "@/components/common/Button";
import { InformationPanel } from "@/components/common/InformationPanel";
import { myCollection } from "@/hooks/myCollection";
import { apiClient } from "@/services/api";
import { CollectionItem, useGlobalStore } from "@/store/info";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function MyCollections() {
  const { mycollection, addToCollection, setSingleCollectionItem, singleCollectionItem } = useGlobalStore();
  const router = useRouter();


  const handleNext = (item: CollectionItem) => {
    setSingleCollectionItem(item);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const hasApiBeenCalled = useRef(false);
  useEffect(() => {
    addToCollection([
      {
        "title": "宇宙のスケール",
        "description": "星までの長さと時間を<br>はかることができる<br>じょうぎ！<br>夜は空を見上げて<br>星をながめてみよう",
        "image": "/images/items/1/xxxxxx.webp",
        "count": 1
      },
      {
        "title": "景品2",
        "description": "ああああああああああああああああああああ",
        "image": "",
        "count": 2
      },
      {
        "title": "景品2",
        "description": "ああああああああああああああああああああ",
        "image": "",
        "count": 2
      },
      {
        "title": "景品2",
        "description": "ああああああああああああああああああああ",
        "image": "/images/items/2/xxxxxx.webp",
        "count": 2
      },
      {
        "title": "景品2",
        "description": "ああああああああああああああああああああ",
        "image": "/images/items/2/xxxxxx.webp",
        "count": 2
      },
    ]);
    if (mycollection.length === 0 && !hasApiBeenCalled.current) {
      hasApiBeenCalled.current = true;
      apiClient
        .post('/award/item/gets', {
          volatile_token: localStorage.getItem('volatile_token'),
          player_id: localStorage.getItem('player_id'),
        })
        .then((response) => {
          // addToCollection(response.data.data.list);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);

  const [initialItems, setInitialItems] = useState(() => myCollection(singleCollectionItem));

  useEffect(() => {
    setInitialItems(myCollection(singleCollectionItem));
  }, [singleCollectionItem]);

  const items = initialItems?.items || [];

  let buttonText = "";
  let classname = "";
  let style = {};

  if (currentIndex === 0) {
    buttonText = "ホームにもどる";
    classname = 'relative h-[700px] w-[390px] mt-10  bg-cover bg-center bg-no-repeat mt-auto mb-4';
    style = {
      backgroundImage: `url('/images/img_cuppord.png')`,
    };

  } else if (currentIndex === 1) {
    buttonText = "もどる";
    classname = 'relative w-[390px] mt-auto mb-4';
    style = {
      background: `transparent`,
    };
  }
  return (
    <div
      className={`mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden ${currentIndex === 1 ? 'bg-cover bg-center bg-no-repeat' : ''}`}
      style={currentIndex === 1 ? { backgroundImage: `url('/images/messages/bg_message.png')` } : { background: 'white' }}
    >
      <div className={classname} style={style}>
        {currentIndex === 0 && (
          <>
            {mycollection && mycollection.length > 0 && (
              // <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                {mycollection.map((item) => (
                  <div key={item?.id ?? item?.title} className="relative cursor-pointer">
                    <Image
                      src={item?.image ?? './images/default-image.png'}
                      alt="award"
                      width={150}
                      height={100}
                      onClick={() => handleNext(item)}
                      className="collection_self"
                      style={{ bottom: '-50%', left: '10%' }}
                    />
                  </div>
                ))}
              </div>
            )}

            <Image
              src="/images/img_little_collection_animal.png"
              alt="little_rat"
              width={140}
              height={140}
              className="absolute z-10"
              style={{ bottom: '0%', right: '1%' }}
            />

          </>
        )}
        <div className="absolute w-full flex flex-col items-center mb-20 mt-20" style={{ bottom: '0%' }}>
          {currentIndex === 1 && (
            <Image
              src={singleCollectionItem?.image ?? '/images/default-image.png'}
              alt="award"
              width={150}
              height={150}
              className="gem_points absolute animate-fade-in-up"
              style={{ top: '-25%' }}
            />
          )}
          <InformationPanel
            items={items.slice(0)}
            currentIndex={currentIndex}
            background="transparent"
            withShadow
            className="my-4 w-[350] w-[80%] mb-120 flex flex-col items-center justify-center common_panel_style"
          >
            {currentIndex === 1 && (
              <Button
                className="text-lg font-bold mt-4 text-black bg-gray-300 rounded-l-full rounded-r-full"
                onClick={handlePrevious}
              >
                {buttonText}
              </Button>
            )}
          </InformationPanel>
        </div>
      </div>
      {currentIndex === 0 && (
        <Button
          className="text-lg font-bold relative mt-4 text-black bg-gray-300 rounded-l-full rounded-r-full"
          onClick={() => { router.push('/') }}
        >
          {buttonText}
        </Button>
      )}
    </div>
  )
}