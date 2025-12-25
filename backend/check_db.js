const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const supabase = require('./src/config/supabaseClient');

async function checkDb() {
    console.log('Checking database content...');

    // Count rows
    const { count, error } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error checking DB:', error);
        return;
    }

    console.log(`Total documents in 'documents' table: ${count}`);

    // Fetch one row to check embedding dimension if possible
    const { data, error: err2 } = await supabase
        .from('documents')
        .select('content, embedding')
        .limit(1);

    if (data && data.length > 0) {
        const content = data[0].content;
        console.log(`Row 1 Content Length: ${content.length}`);
        console.log(`Row 1 Trimmed Length: ${content.trim().length}`);
        console.log('Sample content (first 100 chars):', content.substring(0, 100));
    } else {
        console.log('Table is empty.');
    }
}

checkDb();
