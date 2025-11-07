
import React from 'react';

interface AnalysisDisplayProps {
    analysis: string;
    isLoading: boolean;
}

const formatAnalysisText = (text: string) => {
    return text.split('\n').map((line, index) => {
        if (line.startsWith('**')) {
            return <h2 key={index} className="text-xl font-bold mt-6 mb-2 text-gray-800 border-b pb-1 border-blue-200">{line.replace(/\*\*/g, '')}</h2>;
        }
        if (line.trim() === '') {
            return <br key={index} />;
        }
        return <p key={index} className="my-2 leading-relaxed">{line}</p>;
    });
};

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading }) => {
    if (isLoading) {
        return (
            <div className="mt-8 p-6 border-t border-gray-200 flex flex-col items-center justify-center text-gray-600">
                <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="font-semibold">Generando análisis...</p>
                <p className="text-sm">Un momento, el estudiante está repasando sus apuntes.</p>
            </div>
        );
    }

    if (!analysis) {
        return null;
    }

    return (
        <div className="mt-8 mb-8 pt-6 border-t border-gray-200">
             <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Análisis del Caso</h2>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg prose max-w-none">
                {formatAnalysisText(analysis)}
            </div>
        </div>
    );
};
