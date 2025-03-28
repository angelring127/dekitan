"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/services/api";
import { useRouter } from "next/navigation";

interface Nickname {
    id: number;
    nickname: string;
    role: number;
}

const SubOwnerEdit = () => {
    const [nicknames, setNicknames] = useState<Nickname[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const fetchNicknames = async () => {
            try {
                const response = await apiClient.post('/account/profile/list');

                if ((response.data.status === 2000)) {
                    setNicknames(response.data.data.list);
                    console.log(response.data.data.list);
                }
            } catch (err) {
                setError('An error occurred while fetching the data');
            } finally {
                setLoading(false);
            }
        };

        fetchNicknames();
    }, []);

    const handleNicknameClick = (role: number, id: number, nickname: string) => {
        if (role === 3) {
            router.push(`/profile/editFamilyProfile/child?id=${id}&nickname=${nickname}`);
        } else if (role === 2) {
            router.push(`/profile/editFamilyProfile/subOwner?id=${id}&nickname=${nickname}`);
        }
    };

    const filteredNicknames = nicknames.filter((user) => {
        if (role === 1) {
            return user.role === 2 || user.role === 3;
        } else if (role === 2) {
            return user.role === 3;
        }
        return true;
    });

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                <span className="font-bold flex justify-center mb-10">
                    家族のプロフィール編集
                </span>
                <ul>
                    {filteredNicknames.map((user) => (
                        <li key={user.id}
                            className="mb-4"
                            onClick={() => handleNicknameClick(user.role, user.id, user.nickname)}
                        >
                            {user.nickname}
                        </li>
                    ))}
                </ul>
                <span className="mt-10"
                    onClick={() => router.push('/profile/addFamilyProfile')}
                >+新規登録</span>
            </div>
        </div>
    );
};

export default SubOwnerEdit;
