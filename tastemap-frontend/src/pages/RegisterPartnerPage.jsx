import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPartnerPage() {
    const navigate = useNavigate();

    const handleStartRegistration = () => {
        const token = localStorage.getItem('token');
        if (token) {
            // Если пользователь уже авторизован, отправляем в панель управления
            navigate('/dashboard');
        } else {
            // Если не авторизован — на регистрацию с выставленной галочкой
            navigate('/register', { state: { isOwner: true } });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Хлебные крошки */}
            <div className="text-xs text-gray-400 mb-6">
                <Link to="/" className="hover:underline">Головна</Link> &gt; <span className="text-gray-600">Реєстрація закладу</span>
            </div>

            {/* Hero Баннер */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
                <div className="max-w-xl">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Зареєструйте свій <span className="text-brand">ЗАКЛАД</span><br />
                        на Tastemap.com
                    </h1>
                    <p className="text-gray-600 text-sm mb-6">
                        Реєструйте свій заклад в нашому додатку та заробляйте більше, швидко і виходьте на нові ринки.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm w-full md:w-80 shrink-0">
                    <p className="text-xs text-gray-500 mb-4">
                        На Tastemap.com вже зареєстровано <strong>2550 закладів</strong> — приєднуйтесь і ви
                    </p>
                    <button
                        onClick={handleStartRegistration}
                        className="w-full py-3.5 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition shadow-md"
                    >
                        Розпочати реєстрацію
                    </button>
                </div>
            </div>

            {/* Заголовок отзывов партнеров */}
            <div className="text-center mb-8">
                <span className="inline-block px-4 py-1.5 border border-brand text-brand rounded-full text-xs font-semibold uppercase tracking-wider">
                    Що кажуть інші власники закладів
                </span>
            </div>

            {/* Карточки отзывов рестораторов */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-between">
                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                        "Розпочати роботу з Tastemap.com було дуже просто, а головне, це не зайняло багато часу."
                    </p>
                    <div className="flex items-center gap-3">
                        <img
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
                            alt="Марія Роуз"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-xs font-bold text-gray-900">Марія Роуз</h4>
                            <p className="text-[11px] text-gray-400">Власниця ресторану VINO e CUCINO</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-between">
                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                        "Найбільше відвідувачів ми отримуємо завдяки платформі Tastemap.com. Це допомогло досягти того, що в нас є сьогодні."
                    </p>
                    <div className="flex items-center gap-3">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                            alt="Михайло та Аліна"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-xs font-bold text-gray-900">Михайло та Аліна</h4>
                            <p className="text-[11px] text-gray-400">Співвласники кафе FANDOM</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-between">
                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                        "Я зареєстрував свій заклад дуже швидко та протягом 3 годин вже отримав перше бронювання."
                    </p>
                    <div className="flex items-center gap-3">
                        <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                            alt="Дамір Дорогов"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-xs font-bold text-gray-900">Дамір Дорогов</h4>
                            <p className="text-[11px] text-gray-400">Власник ресторану MATISSR</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}