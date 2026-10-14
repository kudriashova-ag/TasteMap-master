import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Ой! Щось пішло не так!</h2>

            {/* Большой текст 404 с иконкой-локатором посередине */}
            <div className="flex items-center justify-center text-brand font-extrabold text-9xl my-4 tracking-wider">
                <span>4</span>
                <div className="w-24 h-24 bg-brand text-white rounded-b-full rounded-tl-full flex items-center justify-center rotate-45 mx-2 shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-full -rotate-45" />
                </div>
                <span>4</span>
            </div>

            <p className="text-gray-500 mb-8">
                Сторінку, що ви шукаєте не знайдено або її не існує
            </p>

            <Link
                to="/"
                className="px-8 py-3 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition"
            >
                Повернутись на головну
            </Link>
        </div>
    );
}