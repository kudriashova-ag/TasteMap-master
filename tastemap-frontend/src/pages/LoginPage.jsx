import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/Auth/login', { email, password });

            localStorage.setItem('token', response.data.token);

            const userData = response.data.user || {
                firstName: email.split('@')[0],
                email,
            };
            localStorage.setItem('user', JSON.stringify(userData));

            navigate('/profile');
        } catch (err) {
            setError(
                err.response?.data?.message || 'Помилка входу. Перевірте дані.'
            );
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-12 px-4">
            <div className="text-xs text-gray-400 mb-6">
                <Link to="/" className="hover:underline">
                    Головна
                </Link>{' '}
                &gt; <span className="text-gray-600">Вхід</span>
            </div>

            <div className="bg-gray-50 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-sm border border-gray-100">
                <div className="relative min-h-[350px] md:min-h-[500px]">
                    <img
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                        alt="Dish"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Увійдіть або створіть акаунт
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Ви можете увійти за допомогою свого акаунта на Tastemap.com, щоб скористатися нашими послугами
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Електронна адреса
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="Введіть свою електронную адресу"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none bg-white text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Пароль
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="Введіть ваш пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none bg-white text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition shadow-md"
                        >
                            Увійти
                        </button>
                    </form>

                    <p className="text-xs text-gray-400 text-center mt-6">
                        Входячи в акаунт або створюючи новий, ви погоджуєтеся з нашими <a href="#" className="underline">Правилами та умовами</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}