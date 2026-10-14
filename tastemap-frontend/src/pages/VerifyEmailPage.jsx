import React, { useState } from 'react';
import api from '../api/axios';

export default function VerifyEmailPage() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const email = localStorage.getItem('unverified_email') || '';

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Авто-переход на следующее поле
        if (text && index < 5) {
            document.getElementById(`code-input-${index + 1}`).focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const fullCode = code.join('');
        try {
            await api.post(`/Auth/verify-email?email=${email}&code=${fullCode}`);
            alert('Email успішно підтверджено!');
            window.location.href = '/login';
        } catch (err) {
            alert(err.response?.data?.message || 'Неверный код!');
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col justify-between">
            <div className="max-w-2xl mx-auto my-12 p-8 bg-gray-50 rounded-3xl text-center shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Підтвердіть свою електронну пошту
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                    Ми надіслали код підтвердження на вашу ел.пошту.<br />
                    Введіть цей код, щоб продовжити
                </p>

                <form onSubmit={handleVerify}>
                    <div className="flex justify-center gap-3 mb-8">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                id={`code-input-${idx}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, idx)}
                                className="w-12 h-14 text-center text-xl font-bold border rounded-xl focus:border-brand focus:ring-1 focus:ring-brand outline-none bg-white"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition"
                    >
                        Підтвердити електронну адресу
                    </button>
                </form>
            </div>

            {/* Баннер блюда внизу как на скрине */}
            <div className="w-full h-48 overflow-hidden rounded-t-3xl">
                <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                    alt="Dish"
                    className="w-full h-full object-cover object-center"
                />
            </div>
        </div>
    );
}