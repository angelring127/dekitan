'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import InputField from '@/components/common/InputField';

export default function AddSubOwner() {
    const router = useRouter();
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateNickname = () => {
        if (!nickname.trim()) {
            setNicknameError('ニックネームは必須です。');
        } else {
            setNicknameError('');
        }
    };

    const validatePassword = () => {
        const passwordRegex = /^[A-Za-z0-9./!+\-=_$#&%@]{8,16}$/;
        if (!password) {
            setPasswordError('パスワードは必須です。');
        } else if (!passwordRegex.test(password)) {
            setPasswordError('パスワードは8〜16文字以内で、記号は .!/+-_=$#&%@ が利用できます。');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = () => {
        validateNickname();
        validatePassword();

        if (!nicknameError && !passwordError) {
            router.push('/owner/familyProfileEdit');
        }
    };

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-white p-6 mt-10 h-[350px] w-[300px] mx-auto shadow-lg rounded-lg">
                <h4 className="text-center mb-6">サブオーナーを追加</h4>

                <InputField
                    label="ニックネーム"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={validateNickname}
                    error={nicknameError}
                />

                <InputField
                    label="パスワード"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    error={passwordError}
                    placeholder="8〜16文字以内"
                />

                <div className="flex justify-center mt-6">
                    <Button
                        variant="primary"
                        className="text-lg font-bold px-10 py-4 rounded-3xl"
                        onClick={handleSubmit}
                    >
                        追加する
                    </Button>
                </div>
            </div>

            <Button
                variant="primary"
                className="text-lg font-bold px-10 py-4 rounded-3xl mt-6"
                onClick={() => router.push('/owner/familyProfileAdd')}
            >
                もどる
            </Button>
        </div>
    );
}
