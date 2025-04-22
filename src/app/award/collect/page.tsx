'use client'
import { apiClient } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { useGlobalStore } from "@/store/info";
import { CollectionItem } from "@/types/info";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function MyCollections() {
  const { mycollection, addToCollection, setSingleCollectionItem, singleCollectionItem } = useGlobalStore();
  const volatileToken = useAuthStore.getState().token
  const playerId = useGlobalStore.getState().playerId
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const ITEMS_PAR_PAGE = 15

  const hasApiBeenCalled = useRef(false);
  useEffect(() => {
    hasApiBeenCalled.current = true;
    setIsClient(true)
    apiClient
      .post('/award/item/gets', {
        volatile_token: volatileToken,
        player_id: playerId,
      })
      .then((response) => {
        addToCollection(response.data.data.list);
        setTotalPage(Math.ceil(mycollection.length / ITEMS_PAR_PAGE))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const selectPage = (type: string) => {
    if(type == 'prev') {
      setCurrentPage(currentPage - 1)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const selectCollection = (item: CollectionItem) => {
    setSingleCollectionItem(item)
    setIsOpen(true)
  }

  useEffect((): void => {
    const dialogElement = dialogRef.current
    if (!dialogElement) {
      return
    }
    if (isOpen) {
      if (dialogElement.hasAttribute('open')) {
        return
      }
      dialogElement.showModal()
    } else {
      if (!dialogElement.hasAttribute('open')) {
        return
      }
      dialogElement.close()
    }
  }, [isOpen])

  return (
    <>
      {isClient && 
        <div className='mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-cover bg-center bg-no-repeat bg-[url("/images/collect/bg_collection_room.png")] relative'>
          <div className="w-[90%]">
            {mycollection && mycollection.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-10 mb-5">
                {mycollection
                  .slice((currentPage - 1) * ITEMS_PAR_PAGE, currentPage * ITEMS_PAR_PAGE)
                  .map((item) => (
                    <div key={item?.id ?? item?.title} className="relative cursor-pointer w-full aspect-square">
                      <Image
                        src="/images/collect/bg_circle.png"
                        alt="circle"
                        width={150}
                        height={100}
                        onClick={() => selectCollection(item)}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                      <Image
                        src={item?.image ? process.env.NEXT_PUBLIC_API_URL + item?.image : ""}
                        alt="award"
                        width={150}
                        height={100}
                        onClick={() => selectCollection(item)}
                        style={{ 
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "70%",
                          height: "auto",
                          margin: "auto",
                        }}
                      />
                    </div>
                ))}
              </div>
            )}

            <dialog ref={dialogRef} className="max-w-[430px] w-[80%] relative overflow-visible bg-transparent border-none">
              <Image
                src="/images/collect/close_icon.png"
                width={100}
                height={100}
                alt="card"
                style={{
                  position: "absolute",
                  top: "-10%",
                  right: "0%",
                  width: "15%",
                  height: "auto",
                }}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
              <Image
                src="/images/collect/card.png"
                width={100}
                height={100}
                alt="card"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              <div 
                style={{
                  position:"absolute",
                  color:"#b53922",
                  fontSize: "25px",
                  fontWeight:"bold",
                  top: "11%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                {singleCollectionItem?.title}
              </div>
              <Image
                src={singleCollectionItem?.image ? process.env.NEXT_PUBLIC_API_URL + singleCollectionItem?.image : "/images/default-image.png"}
                width={100}
                height={100}
                alt="card_item"
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  width: "70%",
                  height: "auto",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className="font-db"
                style={{
                  position:"absolute",
                  color:"#000000",
                  top: "80%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  width: "75%",
                }}
                dangerouslySetInnerHTML={{ __html: singleCollectionItem?.description ?? '' }}
              />
              <Image
                src="/images/collect/card_txt_frame.png"
                width={100}
                height={100}
                alt="card_text"
                style={{
                  position: "absolute",
                  top: "80%",
                  left: "50%",
                  width: "85%",
                  height: "auto",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </dialog>

            <div className="flex justify-center gap-6">
              {/* 左矢印 */}
              <div
                className={`bg-[#00803a] text-white px-7 text-bold text-[25px] rounded-sm cursor-pointer ${
                  currentPage > 1 ? "" : "invisible"
                }`}
                onClick={() => currentPage > 1 && selectPage('prev')}
              >
                {"<"}
              </div>

              {/* 現在ページ */}
              <div className="border-[3px] border-[#00803a] rounded-2xl bg-white py-2 px-7">
                {currentPage} / {totalPage}
              </div>

              {/* 右矢印 */}
              <div
                className={`bg-[#00803a] text-white px-7 text-bold text-[25px] rounded-sm cursor-pointer ${
                  currentPage < totalPage ? "" : "invisible"
                }`}
                onClick={() => currentPage < totalPage && selectPage('next')}
              >
                {">"}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}