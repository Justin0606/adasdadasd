
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, UserIcon, BotIcon } from './icons';

interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

interface ChatProps {
    history: ChatMessage[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
}

const formatChatText = (text: string) => {
    return text.split('\n').map((line, index) => {
        if (line.trim() === '') return <br key={index} />;
        // Basic markdown for bold text
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
            <p key={index} className="my-1">
                {parts.map((part, i) =>
                    part.startsWith('**') ? (
                        <strong key={i}>{part.slice(2, -2)}</strong>
                    ) : (
                        part
                    )
                )}
            </p>
        );
    });
};


export const Chat: React.FC<ChatProps> = ({ history, isLoading, onSendMessage }) => {
    const [input, setInput] = useState('');
    const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Pregunta Sobre el Análisis</h3>
            <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto flex flex-col space-y-4">
                {history.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <BotIcon className="h-5 w-5 text-gray-600" />
                            </div>
                        )}
                        <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                            {formatChatText(msg.content)}
                        </div>
                         {msg.role === 'user' && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-blue-600" />
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3 justify-start">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                           <BotIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="max-w-md p-3 rounded-lg bg-white text-gray-800 shadow-sm flex items-center space-x-2">
                           <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                           <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                           <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                 <div ref={endOfMessagesRef} />
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu pregunta aquí..."
                    disabled={isLoading}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    aria-label="Escribe tu pregunta"
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    aria-label="Enviar pregunta"
                >
                    <SendIcon className="h-6 w-6" />
                </button>
            </form>
        </div>
    );
};
