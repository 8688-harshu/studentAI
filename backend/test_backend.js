const fs = require('fs');
const path = require('path');

async function testBackend() {
    console.log('Testing Backend...');

    try {
        // 1. Test Root
        console.log('\n--- Testing Root Endpoint ---');
        const resRoot = await fetch('http://localhost:3000/');
        const textRoot = await resRoot.text();
        console.log('Response:', textRoot);

        // 2. Test Chat (should fail or return empty if no docs)
        console.log('\n--- Testing Chat Endpoint (Pre-Ingest) ---');
        const resChat = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: 'What is an OS?' })
        });
        const jsonChat = await resChat.json();
        console.log('Response:', jsonChat);

        // Note: Ingest test requires a real file upload, easier to do manually or with more complex script.
        // For now, if server runs and chat endpoint responds, we are in good shape.

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testBackend();
