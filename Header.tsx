
import React from 'react';
import { LawIcon } from './icons';

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
                <LawIcon className="h-8 w-8 text-blue-600 mr-3"/>
                <div>
                    <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                        Analizador de Casos de Derecho Penal
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 text-center md:text-left">
                        Perspectiva de un estudiante de 2º de carrera
                    </p>
                </div>
            </div>
        </header>
    );
};
