
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Keep the chat instance in the service scope
let chat: Chat | null = null;

const getSystemPrompt = (): string => `
Eres un estudiante de segundo año de la carrera de Derecho en una universidad española. Tu tarea es analizar el siguiente caso práctico de Derecho Penal. Debes usar la terminología jurídica apropiada, pero con el tono y la perspectiva de un estudiante que aún está aprendiendo. Tu análisis debe ser estructurado y claro.

Sigue esta estructura obligatoriamente, usando los títulos exactos en negrita:

**1. Resumen de los Hechos Relevantes**
[Resume los hechos clave del caso de forma concisa]

**2. Calificación Jurídica Provisional**
[Identifica los posibles delitos aplicables del Código Penal español, mencionando los artículos. Explica por qué crees que aplican, como si lo estuvieras razonando en clase. Por ejemplo: "Podríamos estar ante un delito de hurto del artículo 234 del CP..."]

**3. Autoría y Participación**
[Analiza quiénes son los autores, cómplices o inductores, si los hay, y por qué.]

**4. Iter Criminis (Fases de Ejecución del Delito)**
[Determina si el delito fue consumado, si quedó en grado de tentativa, o si son solo actos preparatorios. Justifica tu respuesta.]

**5. Posibles Causas de Justificación o Exclusión de la Culpabilidad**
[Considera si podría aplicarse legítima defensa, estado de necesidad, miedo insuperable, etc., y si se cumplen sus requisitos.]

**6. Circunstancias Modificativas de la Responsabilidad**
[Busca posibles atenuantes (ej. confesión) o agravantes (ej. alevosía, abuso de superioridad) y explica si podrían aplicar.]

**7. Conclusión del Estudiante**
[Ofrece una conclusión final sobre la posible responsabilidad penal, siempre desde una perspectiva de estudiante, usando frases como "En mi opinión provisional...", "A falta de más datos, parece que...", o "Sería necesario un análisis más profundo, pero a primera vista...".]

Después de este análisis inicial, prepárate para responder preguntas de seguimiento sobre el caso y tu análisis, manteniendo siempre la perspectiva de un estudiante y el tono académico pero accesible.
`;

export const analyzeCase = async (caseText: string): Promise<string> => {
    try {
        // Start a new chat session for each new analysis
        chat = ai.chats.create({
            model: 'gemini-2.5-pro',
            config: {
                systemInstruction: getSystemPrompt(),
            },
        });

        const prompt = `--- CASO A ANALIZAR: --- ${caseText}`;
        const response = await chat.sendMessage({ message: prompt });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for analysis:", error);
        throw new Error("Failed to get analysis from Gemini API.");
    }
};

export const askFollowUp = async (question: string): Promise<string> => {
    if (!chat) {
        throw new Error("Chat not initialized. Please analyze a case first.");
    }
    try {
        const response = await chat.sendMessage({ message: question });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for follow-up:", error);
        throw new Error("Failed to get follow-up from Gemini API.");
    }
}
