import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

export default function RegisterPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Если пользователь уже вошел в аккаунт, отправляем его в профиль или панель управления
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const initialIsOwner = location.state?.isOwner || false;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isRestaurantOwner: initialIsOwner
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (location.state?.isOwner) {
            setFormData(prev => ({ ...prev, isRestaurantOwner: true }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Паролі не збігаються!');
            return;
        }

        try {
            await api.post('/Auth/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                isRestaurantOwner: formData.isRestaurantOwner
            });

            localStorage.setItem('unverified_email', formData.email);
            alert('Реєстрація успішна! Перевірте пошту для підтвердження.');
            navigate('/verify-email');
        } catch (err) {
            setError(err.response?.data?.message || 'Помилка реєстрації.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-12 px-4">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    Створити акаунт TasteMap
                </h2>
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Заповніть дані для реєстрації на платформі
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Ім'я</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand outline-none bg-white text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Прізвище</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand outline-none bg-white text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Електронна адреса</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand outline-none bg-white text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand outline-none bg-white text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Підтвердіть пароль</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand outline-none bg-white text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="isRestaurantOwner"
                            name="isRestaurantOwner"
                            checked={formData.isRestaurantOwner}
                            onChange={handleChange}
                            className="w-4 h-4 text-brand rounded focus:ring-brand"
                        />
                        <label htmlFor="isRestaurantOwner" className="text-sm text-gray-700">
                            Я хочу зареєструватися як власник закладу
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition shadow-md mt-4"
                    >
                        Зареєструватися
                    </button>
                </form>
            </div>
        </div>
    );
}