import React from 'react';
import { Button } from '@/components/common/Button';

interface ConfirmDeletePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string; 
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-[250px] relative">
                <button
                    className="absolute top-2 right-2 text-xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                <h4 className="text-center mb-40 mt-5">
                    {message}
                </h4>
                <Button
                    className="w-full py-2 rounded-3xl"
                    onClick={onConfirm}
                >
                    削除する
                </Button>
            </div>
        </div>
    );
};

export default ConfirmDeletePopup;
