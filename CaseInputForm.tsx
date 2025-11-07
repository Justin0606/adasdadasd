
import React from 'react';
import { AnalyzeIcon } from './icons';

interface CaseInputFormProps {
    caseText: string;
    setCaseText: (text: string) => void;
    onAnalyze: () => void;
    isLoading: boolean;
}

export const CaseInputForm: React.FC<CaseInputFormProps> = ({ caseText, setCaseText, onAnalyze, isLoading }) => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAnalyze();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="case-text" className="block text-lg font-semibold text-gray-700 mb-2">
                Introduce el caso práctico
            </label>
            <textarea
                id="case-text"
                rows={10}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-y"
                placeholder="Pega aquí la descripción del caso a analizar..."
                value={caseText}
                onChange={(e) => setCaseText(e.target.value)}
                disabled={isLoading}
            />
            <div className="mt-6 flex justify-center">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analizando...
                        </>
                    ) : (
                       <>
                            <AnalyzeIcon className="h-5 w-5 mr-2" />
                            Analizar Caso
                       </>
                    )}
                </button>
            </div>
        </form>
    );
};
