"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import { apiClient } from "@/services/api";
import { useRouter } from "next/navigation";

const Withdraw: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLeave = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post("/account/regist/leave");

            if (response.data.status_code !== 2000) {
                router.push("/owner/withdraw/complete");
            } else {
                setError("退会に失敗しました。");
            }
        } catch (err) {
            console.error("Error leaving account:", err);
            setError("リクエスト中にエラーが発生しました。");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                <div className="text-center mb-4">
                    <span className="text-xl font-bold">退会</span>
                </div>
                <span className="text-center">退会してしまうと、いままでのげんせきのエネルギー、アイテム等、復元することができません。本当に退会しますか？
                </span>
                {error && (
                    <div className="mt-4 text-red-500 text-center">{error}</div>
                )}
                <div className="flex justify-center mt-6 rounded-full">
                    <Button
                        variant="primary"
                        onClick={handleLeave}
                        disabled={loading}
                    >
                        {loading ? "処理中..." : "退会する"}
                    </Button>
                </div>
            </div>
            <div className="text-lg w-[100] font-bold mt-4 rounded-full">
                <Button
                    variant="primary"
                    onClick={() => router.push('/owner/ownerMenu')}
                >
                    もどる
                </Button>
            </div>
        </div>
    );
};

export default Withdraw;
