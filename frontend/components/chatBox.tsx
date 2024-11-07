import { useState, ChangeEvent, FormEvent } from 'react';

interface ChatMessage {
    sender: 'user' | 'bot';
    content: string;
}

export default function Chatbot() {
    const [message, setMessage] = useState<string>('');
    const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const ERROR_MESSAGE = 'There was an error processing your request.';

    const sendMessage = async (msg: string) => {
        if (!msg.trim()) return;

        setChatLog((prevChatLog) => [...prevChatLog, { sender: 'user', content: msg }]);
        setMessage('');

        try {
            setIsSending(true);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ text: msg }],
                }),
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const data = await response.json();

            setChatLog((prevChatLog) => [
                ...prevChatLog,
                { sender: 'bot', content: data.botMessage || ERROR_MESSAGE },
            ]);
        } catch (error) {
            console.error('Error fetching bot response:', error);
            setChatLog((prevChatLog) => [
                ...prevChatLog,
                { sender: 'bot', content: ERROR_MESSAGE },
            ]);
        } finally {
            setIsSending(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim()) sendMessage(message);
    };

    return (
        <div className="max-w-md p-4">
            <h2 className="text-lg font-bold mb-4">Chat with AI</h2>
            <div className="border p-3 rounded-lg mb-4 h-64 overflow-y-auto">
                {chatLog.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>
                        <p>{msg.content}</p>
                    </div>
                ))}
                {isSending && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-lg bg-gray-200 text-gray-800">Generating...</div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSend} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type a message"
                    className="w-full p-2 border rounded-lg focus:outline-none"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    disabled={isSending}
                >
                    {isSending ? <span className="loader"></span> : 'Send'}
                </button>
            </form>
            <style jsx>{`
                .loader {
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #3498db;
                    border-radius: 50%;
                    width: 14px;
                    height: 14px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
