import { streamText } from "ai"
import { openrouter } from "../lib/ai";

export default {
    async generateRecipe(prompt: string){
        const result = streamText({
            model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            prompt,
            system: 'Eres un bartender con 20 años de experiencia y siempre respondes con total amabilidad y determinación',//darle contexto
            temperature: 0 //1 es crativa 0 es determinnista
        })
        return result.textStream;
    }
}