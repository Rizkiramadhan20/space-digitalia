'use client';

import React, { useEffect, useState } from 'react';

import { FiSun } from 'react-icons/fi';

import { WeatherState } from '@/hooks/dashboard/user/card/types/types';

export default function WeatherCard() {
    const [weather, setWeather] = useState<WeatherState>({
        temp: null,
        condition: 'Loading...',
        city: 'Loading...',
        error: null
    });

    useEffect(() => {
        // Fetch weather data
        const getWeather = async () => {
            try {
                if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
                    throw new Error('Weather API key not configured');
                }

                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Jakarta&aqi=no`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Weather service unavailable');
                }

                const data = await response.json();
                setWeather({
                    temp: data.current.temp_c,
                    condition: data.current.condition.text,
                    city: data.location.name,
                    error: null
                });
            } catch (error) {
                console.error('Error fetching weather:', error);
                setWeather({
                    temp: null,
                    condition: 'Error',
                    city: 'Error',
                    error: 'Unable to load weather data'
                });
            }
        };

        getWeather();
    }, []);

    return (
        <div className="flex flex-col bg-white backdrop-blur-lg rounded-3xl p-6 transition-all duration-300 border border-gray-300">
            <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-blue-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                    <FiSun className="w-7 h-7 text-blue-600" />
                </div>
                <span className="px-4 py-1.5 bg-blue-100/50 backdrop-blur text-blue-600 text-sm font-medium rounded-full">Cuaca</span>
            </div>
            {weather.error ? (
                <div className="mt-4">
                    <p className="text-red-500 text-sm">{weather.error}</p>
                </div>
            ) : (
                <div className="mt-6">
                    <h3 className="text-3xl font-bold mb-2">
                        {weather.temp !== null ? `${weather.temp}°C` : '--°C'}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium">{weather.condition}</p>
                    <p className="text-slate-500 text-sm">{weather.city}</p>
                </div>
            )}
        </div>
    );
} 