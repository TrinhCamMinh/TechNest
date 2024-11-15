// src/components/DualSlider.js
import React, { useState } from 'react';

const DualSlider = () => {
    const [minValue, setMinValue] = useState(8_900_000);
    const [maxValue, setMaxValue] = useState(93_000_000);

    const minLimit = 8_900_000;
    const maxLimit = 93_000_000;

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-4">
                <input
                    type="number"
                    value={minValue}
                    onChange={handleMinChange}
                    className="w-24 p-2 border border-gray-300 rounded text-center"
                />
                <span className="text-gray-500">—</span>
                <input
                    type="number"
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="w-24 p-2 border border-gray-300 rounded text-center"
                />
            </div>

            <div className="relative w-full max-w-lg">
                <input
                    type="range"
                    min={minLimit}
                    max={maxLimit}
                    value={minValue}
                    onChange={handleMinChange}
                    className="absolute w-full h-1 bg-gray-200 rounded-lg appearance-none pointer-events-none"
                    style={{
                        pointerEvents: 'auto',
                        zIndex: minValue < maxLimit ? 3 : 1,
                    }}
                />
                <input
                    type="range"
                    min={minLimit}
                    max={maxLimit}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="absolute w-full h-1 bg-gray-200 rounded-lg appearance-none pointer-events-none"
                    style={{
                        pointerEvents: 'auto',
                        zIndex: maxValue > minLimit ? 3 : 1,
                    }}
                />

                <div
                    className="absolute h-1 bg-blue-500 rounded-lg"
                    style={{
                        left: `${((minValue - minLimit) / (maxLimit - minLimit)) * 100}%`,
                        right: `${100 - ((maxValue - minLimit) / (maxLimit - minLimit)) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default DualSlider;
