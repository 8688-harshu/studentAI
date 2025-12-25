// const fetch = require('node-fetch'); // Native fetch is available in Node 18+

const question = process.argv[2];

if (!question) {
    console.error('Usage: node chat.js "Your question here"');
    process.exit(1);
}

async function chat() {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('Server Error:', data);
            return;
        }
        console.log('--- Answer ---');
        console.log(data.answer);
        console.log('\n--- Sources ---');
        console.log(data.sources);
    } catch (error) {
        console.error('Chat failed:', error);
    }
}

chat();
