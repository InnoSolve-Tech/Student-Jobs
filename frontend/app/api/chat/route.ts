import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + GEMINI_API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: messages.map((msg: { text: string }) => ({ text: msg.text }))
                    }
                ]
            }),
        });

        if (!response.ok) throw new Error(`Gemini API error: ${response.statusText}`);

        const data = await response.json();

        const botMessage = data?.candidates[0]?.content?.parts[0]?.text || 'No response';
        return NextResponse.json({ botMessage });

    } catch (error: any) {
        console.error('Error connecting to Gemini:', error.message || error);
        return NextResponse.json({ error: 'Error connecting to Gemini API' }, { status: 500 });
    }
}
