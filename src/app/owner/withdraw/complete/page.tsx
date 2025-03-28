"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";

const withdrawComplete: React.FC = () => {
    const router = useRouter();

    return (

        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                <div className="text-center mb-4">
                    <span className="text-xl font-bold">退会完了</span>
                </div>
                <div className="text-center mb-6">
                    <span className="text-lg">
                        退会処理が完了しました。
                    </span>
                </div>
                <div className="text-center">
                    <Button
                        variant="primary"
                        onClick={() => router.push("/")}
                    >
                        TOP
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default withdrawComplete;
