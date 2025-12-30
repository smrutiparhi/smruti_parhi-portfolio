
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCE, EDUCATION } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const resumeContext = `
Role: You are the AI assistant for Smruti Ranjan Parhi.
Information about Smruti:
- Full Name: ${PERSONAL_INFO.name}
- Current Status: Student at Koneru Lakshmaiah University, B.Tech CSE (CGPA: 8.44)
- Location: ${PERSONAL_INFO.location}
- Skills: ${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('; ')}
- Main Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}
- Experience: ${EXPERIENCE[0].role} at ${EXPERIENCE[0].company}
- Education: ${EDUCATION.map(e => `${e.degree} from ${e.institution}`).join(', ')}

Your goal is to answer questions from recruiters or visitors about Smruti's background, skills, and projects based on this context. Be professional, concise, and enthusiastic.
`;

export const chatWithResume = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: resumeContext,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later!";
  }
};
