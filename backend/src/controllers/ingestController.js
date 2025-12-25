const pdfParse = require('pdf-parse');
const supabase = require('../config/supabaseClient');
const genAI = require('../config/aiClient');

const getEmbedding = async (text) => {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
};

const chunkText = (text, chunkSize = 1000) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
};

exports.ingestFile = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        let text = '';
        if (file.mimetype === 'application/pdf') {
            const data = await pdfParse(file.buffer);
            text = data.text;
        } else {
            text = file.buffer.toString('utf-8');
        }

        if (!text) {
            return res.status(400).json({ error: 'Could not extract text from file' });
        }

        // Sanitize text: remove null bytes and other common issues for Postgres
        text = text.replace(/\u0000/g, '');

        const chunks = chunkText(text);
        const documents = [];

        console.log(`Processing ${chunks.length} chunks...`);

        for (const chunk of chunks) {
            const embedding = await getEmbedding(chunk);
            documents.push({
                content: chunk,
                embedding: embedding,
                metadata: { filename: file.originalname }
            });
        }

        const { data, error } = await supabase
            .from('documents')
            .insert(documents);

        if (error) {
            throw error;
        }

        res.json({ message: 'File ingested successfully', chunks: chunks.length });

    } catch (error) {
        console.error('Ingest error:', error);
        res.status(500).json({ error: error.message });
    }
};
