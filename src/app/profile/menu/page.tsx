"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { apiClient } from "@/services/api";

interface Omikuji {
    theme?: string;
}

const Menu: React.FC = () => {
    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const role = 1;
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [task, setTask] = useState<string | null>(null);
    const [omikuji, setOmikuji] = useState<Omikuji | null>(null);
    const [userPassword, setUserPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await apiClient.post("/account/profile/user/get", {
                    user_id: 9,
                });
                if (response.data.status === 2000) {
                    setUserPassword(response.data.data.password);
                } else {
                    console.error("Error fetching user profile:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        getUserProfile();
    }, []);

    const handlePasswordSubmit = () => {
        if (password === userPassword) {
            setIsPasswordValid(true);
            setErrorMessage(null);
        } else {
            setIsPasswordValid(false);
            setErrorMessage("パスワードが間違っています。もう一度入力してください。");
        }
    };

    useEffect(() => {
        if (isPasswordValid) {
            const getTaskAndOmikuji = async () => {
                try {
                    const taskResponse = await apiClient.post("/event/task/gets", {
                        player_id: 7,
                    });
                    const omikujiResponse = await apiClient.post("/event/lot/get", {
                        player_id: 7,
                    });
                    if (taskResponse.data.status === 2000) {
                        const tasks = taskResponse.data.data.list;
                        setTask(tasks.length > 0 ? tasks[0].title : null);
                    }

                    if (omikujiResponse.data.status === 2000) {
                        const omikujiData = omikujiResponse.data.data;
                        setOmikuji(omikujiData || null);
                    }
                } catch (error) {
                    console.error("Error fetching task and omikuji data:", error);
                }
            };

            getTaskAndOmikuji();
        }
    }, [isPasswordValid]);

    if (!isPasswordValid) {
        return (
            <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
                <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-5">
                        <label className="mb-5">パスワードを入力してください。</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 w-full font-bold"
                        />
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    </div>
                    <div className="flex justify-center mt-6 rounded-full">
                        <Button className="flex justify-center text-lg mt-4 px-6 py-2 rounded-full"
                            onClick={handlePasswordSubmit}>つぎへ</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                {task && <div className="mb-4 flex justify-center">{task}</div>}
                {omikuji && omikuji.theme && (
                    <div className="mb-4 flex justify-center">{omikuji.theme}</div>
                )}
                <div className="mb-10 mt-10">
                    <div className="mb-4" onClick={() => router.push("/profile/profileEdit")}>
                        プロフィール編集
                    </div>
                    <div className="mb-4" onClick={() => router.push("/profile/editFamilyProfile")}>
                        家族のプロフィール編集
                    </div>
                    {role === 1 && (
                        <div className="mb-4" onClick={() => router.push("/owner/withdraw")}>
                            退会
                        </div>
                    )}
                    <div className="mb-4" onClick={() => router.push("/logout")}>
                        ログアウト
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
