"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import { apiClient } from "@/services/api";
import { useGlobalStore } from "@/store/info";
import type { InformationItem } from '@/components/common/InformationPanel/types';
import { InformationPanel } from '@/components/common/InformationPanel';
import { useRouter } from "next/navigation";
import { PLAYER_HONORIFIC_TITLE } from "@/constants";

interface FormValues {
    nickname: string;
    login_password: string;
    login_id: string;
    confirm_login_id: string;
    player_name: string;
    player_honorific_title: number;
    birth_day: string;
}

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<FormValues>({
        nickname: "",
        login_password: "",
        login_id: "",
        confirm_login_id: "",
        player_name: "",
        player_honorific_title: 0,
        birth_day: "",
    });

    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [isAgreed, setIsAgreed] = useState(false);
    const { parentinfo, setParentInfo } = useGlobalStore();
    const { childinfo } = useGlobalStore();
    const router = useRouter();

    const validateForm = () => {
        const newErrors: Partial<FormValues> = {};

        if (!formData.nickname) newErrors.nickname = "ニックネームを入力してください。";
        else if (formData.nickname.length > 8) newErrors.nickname = "８文字以内";
        if (!formData.login_password) newErrors.login_password = "パスワードを入力してください。";
        else if (formData.login_password.length < 6) newErrors.login_password = "パスワードは、8〜16文字以内、記号は .!/+-_=$#&%@が利用できます";

        if (!formData.login_id) newErrors.login_id = "メールアドレスを入力してください。";
        else if (!/\S+@\S+\.\S+/.test(formData.login_id)) newErrors.login_id = "メールアドレスが正しくありません。";

        if (!formData.confirm_login_id) newErrors.confirm_login_id = "確認メールアドレスを入力してください。";
        else if (formData.confirm_login_id !== formData.login_id) newErrors.confirm_login_id = "メールアドレスと一致しません";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const items: InformationItem[] = [
        {
            id: '0',
            content: (
                <div className="flex flex-col items-center gap-4">
                    <span className=" text-xl font-medium">
                        仮登録完了しました。<br></br>
                        ご入力いただいたメールアドレス（ログインＩＤ）に登録確認メールを送信いたしました。
                        メールに記載されているURLをクリックして、登録完了をしてください。<br></br>
                        24時間以内にクリックしていただけないと無効となります。
                    </span>
                </div>
            ),
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                formData.player_name = childinfo.name
                formData.player_honorific_title = PLAYER_HONORIFIC_TITLE.filter(e => e.honorific == childinfo.suffix)[0]['value']
                formData.birth_day = gradeToBirthdate(childinfo.schoolYear)
                
                await apiClient.post("/account/regist/entry", formData)
                .then((response) => {
                    if(response.status == 200) {
                        setParentInfo("name", formData.nickname);
                    }
                })
                .catch(() => {

                });
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    /**
     * 学年を 4月2日の生年月日に変換
     * @param grade 学年 (年少～小6)
     * @param year 基準の年度 (例: 2025)
     * @returns 生年月日 (YYYY/04/02) または null
     */
    function gradeToBirthdate(grade: string): string {
        const date = new Date();
        const year = date.getFullYear()
        const ageMap: Record<string, number> = {
            "年少": 3, "年中": 4, "年長": 5,
            "小学1年生": 6, "小学2年生": 7, "小学3年生": 8, "小学4年生": 9, "小学5年生": 10, "小学6年生": 11
        };

        // 4月2日時点の年齢から生まれた年を算出
        const birthYear = year - ageMap[grade];

        return `${birthYear}-04-02`;
    }


    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            {parentinfo.name ? (
                <div>
                    <InformationPanel
                        items={items}
                        currentIndex={0}
                        background="transparent"
                        withShadow
                        className="my-4 mt-20 flex flex-col w-[320px] items-center justify-center common_panel_style"
                    >
                        <Button className="text-lg font-bold mt-4 bg-red-500 text-white rounded-l-full rounded-r-full"
                            onClick={() => router.push('/')}
                        >
                            トップページにもどる
                        </Button>
                    </InformationPanel>
                </div>
            ) : (
                <>
                    <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
                        <span className="font-bold">
                            わくわくワールドで「できた」の原石を集めるには、ユーザ登録が必要です。ぜひ、ご登録ください！
                        </span>

                        <form className="max-w-md mx-auto mt-10  p-4 border rounded-lg shadow-md">
                            <div className="mb-2">
                                <label className="font-bold">ニックネーム:</label>
                                <input
                                    type="text"
                                    value={formData.nickname}
                                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                                    className="border p-2 w-full"
                                />
                                <p className="text-red-500 text-sm">{errors.nickname}</p>
                            </div>

                            <div className="mb-2">
                                <label className="font-bold">パスワード:</label>
                                <input
                                    type="password"
                                    value={formData.login_password}
                                    onChange={(e) => setFormData({ ...formData, login_password: e.target.value })}
                                    className="border p-2 w-full"
                                />
                                <p className="text-red-500 text-sm">{errors.login_password}</p>
                            </div>
                            <div className="mb-2">
                                <label className="font-bold">メールアドレス:</label>
                                <input
                                    type="email"
                                    value={formData.login_id}
                                    onChange={(e) => setFormData({ ...formData, login_id: e.target.value })}
                                    className="border p-2 w-full"
                                />
                                <p className="text-red-500 text-sm">{errors.login_id}</p>
                            </div>

                            <div className="mb-5">
                                <label className="font-bold">メールアドレス再入力:</label>
                                <input
                                    type="email"
                                    value={formData.confirm_login_id}
                                    onChange={(e) => setFormData({ ...formData, confirm_login_id: e.target.value })}
                                    className="border p-2 w-full"
                                />
                                <p className="text-red-500 text-sm">{errors.confirm_login_id}</p>
                            </div>
                            <span>
                                <a href="https://www.google.com" target="_blank" className="text-blue-500">利用規約</a>、
                                <a href="https://www.google.com" target="_blank" className="text-blue-500">プライバシーポリシー</a>
                            </span>
                            <div className="mt-4">


                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setIsAgreed(e.target.checked)}
                                        checked={isAgreed}
                                    />
                                    <span className="ml-2">同意する</span>
                                </label>
                            </div>


                        </form>
                    </div>
                    <Button
                        className="text-lg w-[100] font-bold mt-4 rounded-l-full rounded-r-full"
                        type="submit"
                        disabled={!isAgreed}
                        onClick={handleSubmit}
                    >
                        登録
                    </Button>
                </>
            )}
        </div>
    );
};

export default RegisterForm;