'use client'

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import { apiClient } from "@/services/api";
import DeletePopup from '@/components/common/DeletePopup';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormValues {
    nickname: string;
}

export default function EditChild() {
    const [formData, setFormData] = useState<FormValues>({
        nickname: "",
    });
    const searchParams = useSearchParams();
    const player_id = searchParams.get("id");
    const name = searchParams.get("nickname");

    const names = ['くん', 'ちゃん', 'さん', 'なし'];
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    const [childInfo, setChildInfo] = useState({
        suffix: '',
    });

    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            nickname: e.target.value,
        }));
    };

    const handleSuffixChange = (newSuffix: string) => {
        setChildInfo(prevState => ({
            ...prevState,
            suffix: newSuffix === 'なし' ? '' : newSuffix,
        }));
    };

    const validateForm = () => {
        let newErrors: Partial<FormValues> = {};

        if (formData.nickname && formData.nickname.length > 8) newErrors.nickname = "８文字以内";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const combinedNickname = `${formData.nickname}${childInfo.suffix ? childInfo.suffix : ''}`;

            const playerId = player_id ? Number(player_id) : null;
            const data: { nickname: string; player_id: number | null } = {
                nickname: combinedNickname,
                player_id: playerId
            };

            try {
                const response = await apiClient.post("account/profile/player/put", data);
                console.log(response.data);
                setIsSubmitted(true);
                if (response.data.status === 2000) {
                    router.push('/profile/editFamilyProfile');
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    const deletePlayer = async () => {
        const data = { player_id: player_id };
        try {
            const response = await apiClient.post("/account/profile/player/delete", data);
            console.log("Success:", response.data);
            setIsSubmitted(true);
            router.push('/profile/editFamilyProfile');
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    const deleteMessage = "削除しますか？削除してしまうと、今までのげんせきのエネルギー、アイテムは復元できません。";

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-20">{name}のプロフィール変更
                    <br />プロフィールを変更できます。
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-2 mb-4">
                        <InputField
                            label="【ニックネーム】"
                            type="text"
                            onBlur={() => { }}
                            value={formData.nickname}
                            onChange={handleNicknameChange}
                            error={errors.nickname ?? ""}
                        />
                    </div>

                    <div>
                        <label className="text-sm">【呼び名】</label>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {names.map((suffixItem) => (
                                <button
                                    type="button"
                                    key={suffixItem}
                                    onClick={() => handleSuffixChange(suffixItem)}
                                    className={`flex-shrink-0 rounded-full px-3 py-2 w-20 text-center text-white 
                                        ${childInfo.suffix === (suffixItem === 'なし' ? '' : suffixItem)
                                            ? 'bg-green-700'
                                            : 'bg-green-500'
                                        }`}
                                    aria-pressed={childInfo.suffix === (suffixItem === 'なし' ? '' : suffixItem)}
                                >
                                    {suffixItem}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 rounded-full">
                        <Button
                            variant="primary"
                            className="flex justify-center mt-6 rounded-full"
                            type="submit"
                        >
                            変更する
                        </Button>
                    </div>
                </form>

                <div className="flex justify-center mt-6 rounded-full">
                    <Button
                        variant="primary"
                        className="flex justify-center mt-6 rounded-full"
                        onClick={() => setIsConfirmDeleteOpen(true)}
                    >
                        削除する
                    </Button>
                </div>
                <div className="flex justify-center rounded-full">
                    <DeletePopup
                        isOpen={isConfirmDeleteOpen}
                        onClose={() => setIsConfirmDeleteOpen(false)}
                        onConfirm={deletePlayer}
                        message={deleteMessage}
                    />
                </div>
            </div >
            <div>
                <Button
                    className="text-lg w-[100] mt-4 rounded-full"
                    onClick={() => router.push('/profile/editFamilyProfile')}
                >
                    もどる
                </Button>
            </div>
        </div >
    );
}
