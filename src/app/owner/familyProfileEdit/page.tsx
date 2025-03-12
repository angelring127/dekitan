'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useRouter } from "next/navigation";

export default function FamilyProfileEdit() {
    const router = useRouter();
    const [familyMembers, setFamilyMembers] = useState([
        'こうきくん',
        'ゆかちゃん',
        'パパさん',
    ]);

    return (

        <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-white p-6 m-10 h-[600px] w-[300px] mx-auto shadow-lg rounded-lg flex flex-col space-y-6 relative">
                <h4 className="text-center mb-6">家族のプロフィール編集</h4>
                <div className="space-y-4">
                    {familyMembers.map((member, index) => (
                        <div key={index}>{member}</div>
                    ))}
                </div>

                <div className="flex mt-6">
                    <div>+ 新規追加</div>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Button variant="primary" onClick={() => router.push('/owner/ownerMenu')}>
                    もどる
                </Button>
            </div>
        </div>
    );
}


