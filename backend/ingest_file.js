const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: node ingest_file.js <path_to_file>');
    process.exit(1);
}

const absolutePath = path.resolve(filePath);

if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
}

console.log(`Reading ${absolutePath}...`);

async function uploadFile() {
    try {
        if (typeof fetch === 'undefined') {
            throw new Error('This Node.js version does not support global fetch. Please use Node.js v18+');
        }

        const fileBuffer = fs.readFileSync(absolutePath);

        // Create form data boundary manually if needed, or use generic FormData if available
        // For simplicity in Node without libraries, importing 'form-data' package is safest if global FormData is missing.
        // But we didn't install 'form-data' dev dep. 
        // Let's assume Node 18+ for now but add logging.

        const mimeType = absolutePath.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'text/plain';
        const blob = new Blob([fileBuffer], { type: mimeType });
        const formData = new FormData();
        formData.append('file', blob, path.basename(absolutePath));

        console.log('Sending request...');
        const response = await fetch('http://localhost:3000/api/ingest', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Server responded with ${response.status}: ${text}`);
        }

        const result = await response.json();
        console.log('Success:', JSON.stringify(result, null, 2));

    } catch (error) {
        console.error('Upload failed with error:', error);
        if (error.cause) console.error('Cause:', error.cause);
    }
}

uploadFile();
