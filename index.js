import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import { instructions } from './instructions.js';

dotenv.config()

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: instructions
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export async function run(text) {
    try{
        console.log(text);
        const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
        });
        
        const result = await chatSession.sendMessage(text)
        return(result.response.text())
    }catch(e){
        console.error(e)
        return(JSON.stringify({response: "Lo siento, no entendi la pregunta, puedes repetirla?"}))
    }
}

