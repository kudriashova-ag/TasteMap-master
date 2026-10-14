import React from 'react';
import { Globe, Share2 } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] text-gray-300 pt-12 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h4 className="text-brand font-bold mb-4">Підтримка</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Реєстрація</a></li>
                        <li><a href="#" className="hover:text-white">Забули пароль?</a></li>
                        <li><a href="#" className="hover:text-white">Зв'язатися з центром допомоги</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-brand font-bold mb-4">Правила та налаштування</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Конфіденційність і файли cookie</a></li>
                        <li><a href="#" className="hover:text-white">Правила та умови</a></li>
                        <li><a href="#" className="hover:text-white">Розв'язання суперечок</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-brand font-bold mb-4">Партнерам</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Допомога партнерам</a></li>
                        <li><a href="#" className="hover:text-white">Зареєструвати свій заклад</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-brand font-bold mb-4">Загальна інформація</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Про нас</a></li>
                        <li><a href="#" className="hover:text-white">Як ми працюємо</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <div className="flex gap-4 mb-4 md:mb-0">
                    <Globe className="w-5 h-5 cursor-pointer hover:text-white" />
                    <Share2 className="w-5 h-5 cursor-pointer hover:text-white" />
                </div>
                <div>
                    Авторські права © 2026 Tastemap.com . Усі права захищено.
                </div>
                <button className="border border-gray-700 px-3 py-1 rounded-full hover:border-gray-500 text-gray-400">
                    UAN
                </button>
            </div>
        </footer>
    );
}