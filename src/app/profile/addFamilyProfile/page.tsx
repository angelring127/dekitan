"use client";

import React from "react";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";


const AddFamilyProfile = () => {

    const router = useRouter();
    const role = 1;

    const renderContent = () => {
        if (role === 1) {
            return (
                <>
                    <div className="mt-10"
                        onClick={() => router.push("/demo/init-page")}
                    >子どもの追加</div>
                    <div className="mt-10"
                        onClick={() => router.push("/profile/addFamilyProfile/addSubOwner")}
                    >サブオーナーに追加</div>
                </>
            );
        } else if (role === 2) {
            return (
                <>
                    <div className="mt-10"
                        onClick={() => router.push("/demo/init-page")}
                    >子どもの追加</div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                <div className="font-bold flex justify-center mb-10">
                    家族を追加します <br></br>
                    役割を選んでください
                </div>
                {renderContent()}
            </div>
            <div>
                <Button className="text-lg w-[100] font-bold mt-4 rounded-full"
                    onClick={() => router.push('/profile/menu')}>
                    もどる
                </Button>
            </div>
        </div>
    );
};

export default AddFamilyProfile;
