const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI that generates HIGH-QUALITY interview questions and short, clear answers for interview practice.

Task:
- Role: ${role}
- Experience: ${experience} years
- Topics: ${topicsToFocus}
- Generate ${numberOfQuestions} questions.

GOAL:
- Create realistic interview questions.
- Give each answer as a SHORT explanation that is easy to revise quickly.
- Add code only when the topic truly needs code.

ANSWER STYLE RULES:
- Keep each answer concise and useful.
- Length: 2-4 short paragraphs or around 80-140 words.
- Use simple, beginner-friendly language.
- Start with a direct answer to the question.
- Add 1-2 short supporting points.
- Use \\n\\n between paragraphs for clean UI rendering.
- Do NOT use markdown headings like # or symbols like **.
- Do NOT add labels like "Answer:" or "Example:" unless needed naturally.

CODE RULES:
- Include code ONLY if the concept needs a code example.
- If code is included:
  1. Use triple backticks
  2. Include the language name
  3. Keep code short, practical, and multiline
  4. Put the code after the explanation
- If code is not needed, return only text.

JSON RULES:
- Return ONLY a valid JSON array.
- Escape all double quotes using \\" when needed.
- Replace real line breaks inside values with \\n.
- Do NOT add any text before or after the JSON.
- Every item must match the required schema exactly.

OUTPUT FORMAT:
[
  {
    "question": "Question here?",
    "answer": "Short clear explanation here"
  }
]
`);

const conceptExplainPrompt = (question) => (`
You are an AI that explains interview concepts deeply and clearly like ChatGPT.

Task:
Explain this interview question in a detailed but easy-to-understand way:
"${question}"

GOAL:
- Provide a LONG explanation for the Learn More drawer.
- The response should feel complete, structured, and helpful for revision.
- If code helps, include code examples.
- End with a short conclusion that reinforces the main idea.

RESPONSE STRUCTURE:
- "explanation" must be written in markdown-friendly plain text.
- Use this flow inside the explanation field:
  1. A clear introductory explanation
  2. A deeper breakdown with key points
  3. One or more code examples if useful
  4. A short conclusion section at the end

CONTENT RULES:
- Use simple, beginner-friendly language.
- Make the explanation longer and richer than the short Q&A answer.
- Preferred length: 5-8 short paragraphs.
- Use \\n\\n between paragraphs.
- You may use markdown formatting supported by the UI:
  - short headings like ## Explanation, ## Code Example, ## Conclusion
  - bullet points when helpful
  - fenced code blocks
- Keep the title short and clean.

CODE RULES:
- Include code when it improves understanding.
- If code is included:
  1. Use triple backticks
  2. Include language name
  3. Use clear, multiline examples
  4. Add a short explanation before or after the code
- If code is not useful for the topic, skip it and still provide a strong conclusion.

JSON SAFETY RULES:
- Return ONLY valid JSON.
- Escape all double quotes using \\" when needed.
- Replace real line breaks inside string values with \\n.
- Do NOT add any text outside JSON.

OUTPUT FORMAT:
{
  "title": "Short clear title",
  "explanation": "## Explanation\\n\\nLong explanation here...\\n\\n## Code Example\\n\\n\`\`\`javascript\\nconst example = true;\\nconsole.log(example);\\n\`\`\`\\n\\n## Conclusion\\n\\nShort conclusion here."
}
`);

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};