// // const { GoogleGenAI } = require("@google/genai");
// const { GoogleGenerativeAI } = require("@google/generative-ai");      //extra
// const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// // npm uninstall @google/genai  first do this
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);  //extra
// //@desc  Generate interview questions and answers using Gemini
// //@route POST /api//ai/generate-questions
// //@access Private
// const generateInterviewQuestions = async (req, res) => {
//     try {
//         const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
//         if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-Flash",
//             contents: prompt,
//         });

//         let rawText = response.text;


//         //clean it: Remove  ```json and ``` from beginning and end
//         const cleanedText = rawText
//             .replace(/^```json\s*/, "") //remove starting ```json
//             .replace(/```$/, "")  //remove ending ```
//             .trim(); //remove extra spaces

//         //Now safe to parse
//         const data = JSON.parse(cleanedText);

//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to generate questions",
//             error: error.message,
//         });
//     }
// };

// //@desc Generate explains a interview question
// //@route POST /api/ai/generate-explanation
// //@access Private
// const generateConceptExplanation = async (req, res) => {
//     try {
//         const { question } = req.body;

//         if (!question) {
//             return res.status(400).json({ message: "Missing Required Fields" });
//         }

//         const prompt = conceptExplainPrompt(question);
//         const response = await ai.models.generateContent({
//             model: "gemini-2.0-flash-lite",
//             contents: prompt,
//         });

//         let rawText = response.text;

//         //clean it: Remove ```json and ``` from beginning
//         const cleanedText = rawText
//             .replace(/^```json\s*/, "") // remove starting ```json
//             .replace(/```$/, "") //remove ending ```
//             .trim(); // remove extra spaces

//         //now safe to parse
//         const data = JSON.parse(cleanedText);

//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to generate questions",
//             error: error.message,
//         });
//     }
// };

// module.exports = { generateInterviewQuestions, generateConceptExplanation };




const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//@desc  Generate interview questions and answers using Gemini
//@route POST /api//ai/generate-questions
//@access Private
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",   // ✅ stable model
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        const cleanedText = rawText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/^[^{]*/, "")   // remove text before JSON
            .replace(/[^}]*$/, "")   // remove text after JSON
            .trim();

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch {
            return res.status(500).json({
                message: "Invalid JSON from AI",
                raw: rawText,
            });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error("🔥 GEMINI ERROR:", error);

        // 🔥 HANDLE RATE LIMIT (IMPORTANT)
        if (error.status === 429) {
            return res.status(429).json({
                message: "Daily AI limit reached. Try again later."
            });
        }

        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};


//@desc Generate explains a interview question
//@route POST /api/ai/generate-explanation
//@access Private
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Missing Required Fields" });
        }

        const prompt = conceptExplainPrompt(question);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",   // ✅ same stable model
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        const cleanedText = rawText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/^[^{]*/, "")   // remove text before JSON
            .replace(/[^}]*$/, "")   // remove text after JSON
            .trim();

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch {
            return res.status(500).json({
                message: "Invalid JSON from AI",
                raw: rawText,
            });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error("🔥 GEMINI ERROR:", error);

        // 🔥 HANDLE RATE LIMIT (VERY IMPORTANT)
        if (error.status === 429) {
            return res.status(429).json({
                message: "Daily AI limit reached. Try again later."
            });
        }

        res.status(500).json({
            message: "Failed to generate explanation",
            error: error.message,
        });
    }
};

module.exports = { 
    generateInterviewQuestions, 
    generateConceptExplanation 
};