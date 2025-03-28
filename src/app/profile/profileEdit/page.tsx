"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import { apiClient } from "@/services/api";
import { useRouter } from "next/navigation";
import InputField from "@/components/common/InputField";


interface FormValues {
    nickname: string;
    email: string;
    confirmEmail: string;
    password: string;
}

const ProfileEditForm: React.FC = () => {
    const router = useRouter();
    const role = 1;
    const [formData, setFormData] = useState<FormValues>({
        nickname: "",
        email: "",
        confirmEmail: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<FormValues>>({});

    const validateForm = () => {
        const newErrors: Partial<FormValues> = {};

        // if (!formData.nickname) newErrors.nickname = "ニックネームは必須";
        if (formData.nickname.length > 8) newErrors.nickname = "８文字以内";

        if (formData.password) {
            if (formData.password.length < 8 || formData.password.length > 16) {
                newErrors.password = "パスワードは、8〜16文字以内、記号は .!/+-_=$#&%@が利用できます";
            }
        }

        if (formData.email) {
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "メールアドレスが正しくありません。";
            }
        }
        if (formData.email && formData.email !== formData.confirmEmail) {
            newErrors.confirmEmail = "メールアドレスが一致しません。";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const data = {
                ...Object.fromEntries(
                    Object.entries(formData).filter(([, value]) => value !== "" && value !== null)
                ),
                user_id: 1
            };
            try {
                const response = await apiClient.post("/account/profile/user/put", data);
                if (response.data.status === 2000) {
                    router.push("/profile/menu");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                <div className="font-bold flex justify-center">
                    プロフィール変更<br></br>
                    プロフィールを変更できます。
                </div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10  p-4 border rounded-lg shadow-md">
                    <div className="mb-2">

                        <InputField
                            label="【ニックネーム】"
                            type="text"
                            value={formData.nickname}
                            onBlur={() => { }}
                            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                            error={errors.nickname ?? ""}
                        />

                        <InputField
                            label="【パスワード】"
                            type="password"
                            value={formData.password}
                            onBlur={() => { }}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password ?? ""}
                        />

                        {/* オーナーの場合表示*/}
                        {role === 1 && (
                            <>
                                <InputField
                                    label="【メールアドレス】"
                                    type="email"
                                    value={formData.email}
                                    onBlur={() => { }}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    error={errors.email ?? ""}
                                />

                                <InputField
                                    label="【メールアドレス確認】"
                                    type="email"
                                    value={formData.confirmEmail}
                                    onBlur={() => { }}
                                    onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                                    error={errors.confirmEmail ?? ""}
                                />
                            </>
                        )}
                    </div>
                    <div className="flex justify-center mt-6 rounded-full">
                        <Button
                            variant="primary"
                            className="text-lg w-[100] mt-4 rounded-full"
                            type="submit"
                        >
                            変更する
                        </Button>
                    </div>
                </form>
            </div>
            <div>
                <Button
                    variant="primary"
                    className="text-lg w-[100] mt-4 rounded-full"
                    onClick={() => router.push("/profile/menu")}
                >
                    もどる
                </Button>
            </div>
        </div>
    );
};

export default ProfileEditForm;
