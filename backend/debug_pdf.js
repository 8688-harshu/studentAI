const fs = require('fs');
const pdf = require('pdf-parse');

const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: node debug_pdf.js <path_to_pdf>');
    process.exit(1);
}

const dataBuffer = fs.readFileSync(filePath);

pdf(dataBuffer).then(function (data) {
    console.log('--- PDF Info ---');
    console.log('Pages:', data.numpages);
    console.log('Info:', data.info);
    console.log('\n--- First 500 chars of extracted text ---');
    console.log(JSON.stringify(data.text.substring(0, 500)));

    if (data.text.trim().length === 0) {
        console.error('\n[WARNING] Extracted text is empty! This PDF might be an image/scanned.');
    } else {
        console.log('\n[SUCCESS] Text extraction looks okay.');
    }
}).catch(err => {
    console.error('Error parsing PDF:', err);
});
