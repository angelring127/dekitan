"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { apiClient } from "@/services/api";
import { useGlobalStore } from "@/store/info";
import { useRouter } from "next/navigation";
import InputField from "@/components/common/InputField";

interface FormValues {
    nickname: string;
    password: string;
}

const AddSubOwner = () => {

    const router = useRouter();
    const [formData, setFormData] = useState<FormValues>({
        nickname: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        let newErrors: Partial<FormValues> = {};

        if (!formData.nickname) newErrors.nickname = "ニックネームは必須";
        else if (formData.nickname.length > 8) newErrors.nickname = "８文字以内";

        if (formData.password.length < 8 || formData.password.length > 16) {
            newErrors.password = "パスワードは、8〜16文字以内、記号は .!/+-_=$#&%@が利用できます";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await apiClient.post("/account/profile/user/add", formData);
                console.log("Success:", response.data);
                setIsSubmitted(true);
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center">サブオーナーの追加</div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10  p-4 border rounded-lg shadow-md">
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
                            error={errors.nickname ?? ""}
                        />

                    </div>
                    <div className="flex justify-center mt-6 rounded-full">
                        <Button
                            variant="primary"
                            className="flex justify-center mt-6 rounded-full"
                            type="submit">
                            追加する
                        </Button>
                    </div>
                </form>
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

export default AddSubOwner;
