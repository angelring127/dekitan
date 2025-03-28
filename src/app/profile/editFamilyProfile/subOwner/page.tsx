"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { apiClient } from "@/services/api";
import { useRouter } from "next/navigation";
import InputField from "@/components/common/InputField";
import { useSearchParams } from 'next/navigation';

interface FormValues {
    nickname: string;
    password: string;
}

const EditSubOwner = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormValues>({
        nickname: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const searchParams = useSearchParams();
    const user_id = searchParams.get("id");
    const nickname = searchParams.get("nickname");

    const validateForm = () => {
        let newErrors: Partial<FormValues> = {};

        if (formData.nickname && formData.nickname.length > 8) newErrors.nickname = "８文字以内";

        if (formData.password && (formData.password.length < 8 || formData.password.length > 16)) {
            newErrors.password = "パスワードは、8〜16文字以内、記号は .!/+-_=$#&%@が利用できます";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const data: { user_id: string | null; nickname?: string | null; password?: string | null } = {
                user_id: user_id,
            };

            if (formData.nickname) {
                data.nickname = formData.nickname;
            }

            if (formData.password) {
                data.password = formData.password;
            }

            try {
                const response = await apiClient.post("/account/profile/user/put", data);
                console.log("Success:", response.data);
                setIsSubmitted(true);
                router.push('/profile/editFamilyProfile')
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    const deleteProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { user_id: user_id }
        try {
            const response = await apiClient.post("/account/profile/user/delete", data);
            console.log("Success:", response.data);
            setIsSubmitted(true);
            router.push('/profile/editFamilyProfile')
        } catch (error) {
            console.error("Error submitting form:", error);
        }

    };

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center">{nickname}のプロフィール変更<br />プロフィールを変更できます。</div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
                    <div className="mb-2">
                        <InputField
                            label="ニックネーム"
                            type="text"
                            value={formData.nickname}
                            onBlur={() => { }}
                            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                            error={errors.nickname ?? ""}
                        />

                        <InputField
                            label="パスワード"
                            type="password"
                            value={formData.password.trim()}
                            onBlur={() => { }}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password ?? ""}
                        />
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
                {isConfirmDeleteOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-lg w-[250px] relative">
                            <button
                                className="absolute top-2 right-2 text-xl font-bold"
                                onClick={() => setIsConfirmDeleteOpen(false)}
                            >
                                ×
                            </button>
                            <h4 className="text-center mb-40 mt-5">削除しますか？<br></br>
                                削除してしまうと復元できません。
                            </h4>
                            <Button
                                className="w-full py-2 rounded-3xl"
                                onClick={deleteProfile}
                            >
                                削除する
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Button
                    className="text-lg w-[100] font-bold mt-4 rounded-full"
                    onClick={() => router.push('/profile/menu')}
                >
                    もどる
                </Button>
            </div>
        </div>
    );
};

export default EditSubOwner;
