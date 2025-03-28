"use client";

import React from "react";
import FinishedTasks from "@/components/common/FinishedTasks";
const OwnerMenu: React.FC = () => {
    const finishedTasks = ["こうきくんに未承認できたがあるよ！",
        "ゆかちゃんに未承認のできたがあるよ！"];
    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-white p-6 m-10 h-[600px] w-[300px] mx-auto shadow-lg rounded-lg flex flex-col space-y-6 relative">
                <div className="mt-16">
                    <FinishedTasks tasks={finishedTasks} />
                </div>
                <div className="mt-16 flex flex-col space-y-4">
                    <button className="p-2 text-left w-full hover:bg-gray-200 rounded cursor-pointer">ニュース</button>
                    <button className="p-2 text-left w-full hover:bg-gray-200 rounded cursor-pointer">プロフィール編集</button>
                    <button className="p-2 text-left w-full hover:bg-gray-200 rounded cursor-pointer">家族のプロフィールの編集</button>
                    <button className="p-2 text-left w-full hover:bg-gray-200 rounded cursor-pointer">退会</button>
                    <button className="p-2 text-left w-full hover:bg-gray-200 rounded cursor-pointer">ログアウト</button>
                </div>
            </div>
        </div>
    );
};

export default OwnerMenu;
