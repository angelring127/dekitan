'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';

export default function FamilyProfileAdd() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<'child' | 'sub-owner' | null>(null);

    const handleAdd = () => {
        if (selectedRole === 'child') {
            // router.push('');
        } else if (selectedRole === 'sub-owner') {
            router.push('/owner/familyProfileAdd/sub-owner');
        }
    };

    return (
        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-white p-6 mt-10 h-[280px] w-[280px] mx-auto shadow-lg rounded-lg">
                <h4 className="text-center mb-6">
                    家族を追加します。<br />
                    役割を選んでください。
                </h4>

                <div className="flex items-center space-x-3 mb-4">
                    <input
                        type="radio"
                        id="add-child"
                        name="role"
                        className="w-5 h-5"
                        value="child"
                        onChange={() => setSelectedRole('child')}
                    />
                    <label htmlFor="add-child" className="text-lg">子どもの追加</label>
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="radio"
                        id="add-sub-owner"
                        name="role"
                        className="w-5 h-5"
                        value="sub-owner"
                        onChange={() => setSelectedRole('sub-owner')}
                    />
                    <label htmlFor="add-sub-owner" className="text-lg">サブオーナーに追加</label>
                </div>

                <div className="flex justify-center mt-6">
                    <Button
                        variant="primary"
                        className={`text-lg font-bold px-10 py-4 rounded-3xl mt-6 ${!selectedRole ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={handleAdd}
                        disabled={!selectedRole}
                    >
                        追加する
                    </Button>
                </div>
            </div>

            <Button
                variant="primary"
                className="text-lg font-bold px-10 py-4 rounded-3xl mt-6"
                onClick={() => router.push('/owner/ownerMenu')}
            >
                もどる
            </Button>
        </div>
    );
}
