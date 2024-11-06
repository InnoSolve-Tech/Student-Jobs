import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const MAX_RETRIES = 2;
const INITIAL_DELAY = 1000;

async function callOpenAI(message: string, retries = 0): Promise<any> {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }],
            temperature: 0.7,
            max_tokens: 100,
        });

        return { botMessage: response.choices[0]?.message?.content || 'No response from bot' };

    } catch (error: any) {
        if (error.response?.status === 429 && retries < MAX_RETRIES) {
            const delay = INITIAL_DELAY * 2 ** retries;
            console.log(`429 Rate limit hit, retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return callOpenAI(message, retries + 1);
        }

        console.error('Error connecting to OpenAI:', error);
        return { error: 'An error occurred while connecting to OpenAI' };
    }
}

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();
        if (!message) {
            return NextResponse.json({ message: 'Message is required' }, { status: 400 });
        }

        const { botMessage, error } = await callOpenAI(message);
        if (error) {
            return NextResponse.json({ error }, { status: 429 });
        }

        return NextResponse.json({ botMessage });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 });
    }
}
