import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let ai = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  } catch (err) {
    console.error("Gemini AI initialization error:", err);
  }
}

export async function askAI(question) {
  if (!ai) {
    throw new Error("Gemini API key is not configured.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: question
  });

  return response.text;
}

export async function generateCustomRoadmap(studentDetails, career) {
  if (!ai) {
    return null;
  }

  const prompt = `
Generate a comprehensive, personalized career roadmap for a student aiming to become a "${career}".
Student Details:
- Full Name: ${studentDetails.name || "Student"}
- Education Level: ${studentDetails.education || "Undergraduate"}
- Current Year: ${studentDetails.currentYear || "N/A"}
- College: ${studentDetails.college || "N/A"}
- Current Skills: ${studentDetails.skills || "Beginner"}
- Interests: ${studentDetails.interests || "General"}
- Daily Study Hours: ${studentDetails.studyHours || 4} hours/day
- Target Company: ${studentDetails.targetCompany || "Top Tech Companies"}

Respond ONLY with valid JSON with the following key structure:
{
  "overview": "Detailed introduction and career summary",
  "timeline": "Estimated timeframe to reach job readiness",
  "semesterLearning": ["Phase 1 / Semester 1 step", "Phase 2 step", ...],
  "skills": ["Skill 1", "Skill 2", ...],
  "technologies": ["Tech 1", "Tech 2", ...],
  "certifications": ["Cert 1", "Cert 2"],
  "interviewPrep": ["Preparation tip 1", "Preparation tip 2"],
  "resumeTips": ["Resume advice 1", "Resume advice 2"],
  "softSkills": ["Soft skill 1", "Soft skill 2"],
  "jobRoles": ["Role 1", "Role 2"],
  "salaryInsights": "Expected salary range"
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt
    });

    const text = response.text.trim();
    // Clean JSON formatting markdown wrappers if present
    const cleanJson = text.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```$/, "").trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Error generating roadmap from Gemini AI:", err);
    return null;
  }
}
