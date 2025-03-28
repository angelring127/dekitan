'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import { useRouter } from 'next/navigation';

const familyMemberData = {
    1: { name: 'こうきくん', nickname: 'こうき', yobimei: 'こうちゃん' },
    2: { name: 'ゆかちゃん', nickname: 'ゆか', yobimei: 'ゆかりん' },
    3: { name: 'パパさん', nickname: 'パパ', yobimei: 'おとうさん' },
};

export default function FamilyProfileEdit() {
    const router = useRouter();
    const memberId = 1;
    const [nickname, setNickname] = useState(familyMemberData[memberId].nickname);
    const [yobimei, setYobimei] = useState(familyMemberData[memberId].yobimei);
    const [nicknameError, setNicknameError] = useState('');
    const [yobimeiError, setYobimeiError] = useState('');

    const [isConfirmChangeOpen, setIsConfirmChangeOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const handleSubmit = () => {
        validateNickname();
        validateYobimei();

        if (!nicknameError && !yobimeiError) {
            console.log('Profile updated successfully');
            setIsConfirmChangeOpen(false);
        }
    };

    const handleDelete = () => {
        console.log('Deleting member...');
        setIsConfirmDeleteOpen(false);
    };

    const validateNickname = () => {
        if (!nickname.trim()) {
            setNicknameError('ニックネームは必須です。');
        } else {
            setNicknameError('');
        }
    };

    const validateYobimei = () => {
        if (!yobimei.trim()) {
            setYobimeiError('呼び名は必須です。');
        } else {
            setYobimeiError('');
        }
    };

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-white p-6 m-10 h-[600px] w-[300px] mx-auto shadow-lg rounded-lg">
                <h4 className="text-center mb-6">{familyMemberData[memberId].name}のプロフィール変更。プロフィールを変更できます。</h4>
                <InputField
                    label="ニックネーム"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={validateNickname}
                    error={nicknameError}
                />

                <InputField
                    label="呼び名"
                    type="text"
                    value={yobimei}
                    onChange={(e) => setYobimei(e.target.value)}
                    onBlur={validateYobimei}
                    error={yobimeiError}
                />

                <div className="flex justify-center mt-6">
                    <Button
                        variant="primary"
                        className="text-lg font-bold px-10 py-4 rounded-3xl"
                        onClick={() => setIsConfirmChangeOpen(true)}
                    >
                        変更する
                    </Button>
                </div>

                <div className="flex justify-center mt-4">
                    <Button
                        className="text-lg font-bold px-10 py-4 rounded-3xl"
                        onClick={() => setIsConfirmDeleteOpen(true)}
                    >
                        削除する
                    </Button>
                </div>
            </div>

            <Button
                variant="primary"
                className="text-lg font-bold px-10 py-4 rounded-3xl mt-6"
                onClick={() => router.push('/sub_owner/familyProfileEdit')}
            >
                もどる
            </Button>

            {isConfirmChangeOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-[250px] relative">
                        <button
                            className="absolute top-2 right-2 text-xl font-bold"
                            onClick={() => setIsConfirmChangeOpen(false)}
                        >
                            ×
                        </button>
                        <h4 className="text-center mb-4">変更しますか?</h4>
                        <Button
                            variant="primary"
                            className="w-full py-2 rounded-3xl"
                            onClick={handleSubmit}
                        >
                            変更する
                        </Button>
                    </div>
                </div>
            )}

            {isConfirmDeleteOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-[250px] relative">
                        <button
                            className="absolute top-2 right-2 text-xl font-bold"
                            onClick={() => setIsConfirmDeleteOpen(false)}
                        >
                            ×
                        </button>
                        <h4 className="text-center mb-4">削除しますか?</h4>
                        <p className="text-center mb-4">
                            削除してしまうと、今までのげんせきのエネルギー、アイテムは復元できません。
                        </p>
                        <Button
                            className="w-full py-2 rounded-3xl"
                            onClick={handleDelete}
                        >
                            削除する
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
