import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult, SeverityLevel, ChatMessage } from "./types";
import { MOCK_TREATMENTS } from "./constants";

// Initialize Google GenAI client
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

// Diagnose leaf from base64 image
export const diagnoseLeaf = async (base64Image: string): Promise<DiagnosisResult> => {
  const model = "gemini-3-flash-preview";

  const response = await ai.models.generateContent({
    model,
    contents: [
      { text: "Analyze this image for plant leaf disease. If it's not a leaf, set isLeaf to false. Otherwise, identify the plant, the disease, calculate severity percentage (0-100), and categorize it as Mild (0-20), Moderate (21-50), or Severe (>50). Return ONLY JSON." },
      { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isLeaf: { type: Type.BOOLEAN },
          plantName: { type: Type.STRING },
          diseaseName: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          severityPercentage: { type: Type.NUMBER },
          severityLevel: { type: Type.STRING },
        },
        required: ["isLeaf", "plantName", "diseaseName", "confidence", "severityPercentage", "severityLevel"]
      }
    }
  });

  const text = (response as any).text || '{}';
  const data = JSON.parse(text);

  if (!data.isLeaf) {
    return {
      id: Date.now().toString(),
      timestamp: Date.now(),
      imageUrl: `data:image/jpeg;base64,${base64Image}`,
      plantName: "Unknown",
      diseaseName: "N/A",
      confidence: 0,
      severityPercentage: 0,
      severityLevel: SeverityLevel.MILD,
      treatment: MOCK_TREATMENTS['Healthy'],
      isLeaf: false
    };
  }

  const treatment = MOCK_TREATMENTS[data.diseaseName] || MOCK_TREATMENTS['Healthy'];

  return {
    ...data,
    id: Date.now().toString(),
    timestamp: Date.now(),
    imageUrl: `data:image/jpeg;base64,${base64Image}`,
    treatment
  };
};

// AI assistant for text queries
export const getAiAssistantResponse = async (query: string, history: ChatMessage[]): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are an expert agricultural assistant named AgroGuard. You help farmers diagnose leaf diseases, suggest organic treatments, and provide sustainable farming advice. Keep answers practical, encouraging, and easy to understand for rural users.",
    },
  });

  const response = await (chat as any).sendMessage({ message: query });
  return (response as any).text || "I'm sorry, I couldn't process that query. Please try again.";
};
