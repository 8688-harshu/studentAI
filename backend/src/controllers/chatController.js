const supabase = require('../config/supabaseClient');
const genAI = require('../config/aiClient');

const getEmbedding = async (text) => {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
};

exports.chat = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        console.log('Received question:', question);

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

        // 4. Generate answer using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `You are a helpful study assistant. Use the following context to answer the student's question. If the answer is not in the context, say so, but try to be helpful based on general knowledge if permitted, but prioritize the context.
        
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
