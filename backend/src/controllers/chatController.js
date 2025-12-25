const supabase = require('../config/supabaseClient');
const genAI = require('../config/aiClient');

const getEmbedding = async (text) => {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
};

exports.chat = async (req, res) => {
    try {
        const { question, marks } = req.body;
        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        console.log(`Received question: "${question}" for ${marks} marks`);

        // 1. Generate embedding for the question
        const embedding = await getEmbedding(question);

        // 2. Search for relevant documents in Supabase
        const { data: documents, error } = await supabase
            .rpc('match_documents', {
                query_embedding: embedding,
                match_threshold: 0.1,
                match_count: 5
            });

        if (error) {
            console.error('Supabase search error:', error);
            throw error;
        }

        // 3. Construct context
        let context = "";
        if (documents && documents.length > 0) {
            context = documents.map(doc => doc.content).join("\n\n");
        } else {
            console.log('No relevant documents found.');
        }

        // 4. Construct Prompt based on Marks
        let instruction = "";
        if (marks == 2) {
            instruction = `
            FORMAT FOR 2 MARKS:
            - Provide a direct Definition only.
            - Maximum 2 sentences.
            - Do not use bullet points.
            - Keep it under 50 words.`;
        } else if (marks == 5) {
            instruction = `
            FORMAT FOR 5 MARKS:
            - Start with a clear Definition.
            - Check the context for key features/types/steps.
            - Provide exactly 4-5 bullet points explaining these.
            - End with a one-sentence summary.
            - Keep it around 150 words.`;
        } else if (marks == 10) {
            instruction = `
            FORMAT FOR 10 MARKS:
            - Organize into distinct sections: Introduction, Detailed Explanation, Key Concepts, and Conclusion.
            - Use bold headings for each section.
            - Expand on every point found in the context to provide depth.
            - Aim for a comprehensive explanation (300+ words) if the context allows.
            `;
        } else {
            // Default fallback
            instruction = "Answer concisely.";
        }

        // 5. Generate answer using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `You are a helpful study assistant. Use the following context to answer the student's question. 
        
        ${instruction}

        MOST IMPORTANT: Answer ONLY using the information provided in the "Context" section below. Do not use outside general knowledge.
        - If the document has enough info, follow the ${marks}-marks format perfectly.
        - If the document has limited info, provide as much as possible from the text but state: "The document contains limited information on this topic." at the end.
        - If the answer is not found at all, simply say: "I cannot find this information in the provided document."
        
        Context:
        ${context}
        
        Question:
        ${question}
        
        Answer:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ answer: text, sources: documents });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: error.message });
    }
};
