
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CaseInputForm } from './components/CaseInputForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { Chat } from './components/Chat';
import { analyzeCase, askFollowUp } from './services/geminiService';

interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

const App: React.FC = () => {
    const [caseText, setCaseText] = useState<string>('');
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

    const handleAnalyze = useCallback(async () => {
        if (!caseText.trim()) {
            setError('Por favor, introduce la descripción del caso.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysis('');
        setChatHistory([]); // Reset chat history for new analysis

        try {
            const result = await analyzeCase(caseText);
            setAnalysis(result);
        } catch (err) {
            console.error(err);
            setError('Ha ocurrido un error al analizar el caso. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }, [caseText]);

    const handleSendChatMessage = async (message: string) => {
        if (!message.trim() || isChatLoading) return;

        const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: message }];
        setChatHistory(newHistory);
        setIsChatLoading(true);

        try {
            const result = await askFollowUp(message);
            setChatHistory([...newHistory, { role: 'model', content: result }]);
        } catch (err) {
            console.error(err);
            const errorMsg = 'Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, inténtalo de nuevo.';
            setChatHistory([...newHistory, { role: 'model', content: errorMsg }]);
        } finally {
            setIsChatLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
            <Header />
            <main className="container mx-auto p-4 md:p-8 max-w-4xl">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <CaseInputForm
                        caseText={caseText}
                        setCaseText={setCaseText}
                        onAnalyze={handleAnalyze}
                        isLoading={isLoading}
                    />
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    <AnalysisDisplay
                        analysis={analysis}
                        isLoading={isLoading}
                    />
                    {analysis && !isLoading && (
                        <Chat
                            history={chatHistory}
                            isLoading={isChatLoading}
                            onSendMessage={handleSendChatMessage}
                        />
                    )}
                </div>
                <footer className="text-center text-gray-500 mt-8 text-sm">
                    <p>&copy; {new Date().getFullYear()} Analizador de Casos. Creado con fines académicos.</p>
                </footer>
            </main>
        </div>
    );
};

export default App;
