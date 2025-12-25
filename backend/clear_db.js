const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const supabase = require('./src/config/supabaseClient');

async function clearDb() {
    console.log('Clearing all documents from database...');

    // Delete all rows where id is not null (effectively all rows)
    const { error } = await supabase
        .from('documents')
        .delete()
        .neq('id', 0);

    if (error) {
        console.error('Error clearing DB:', error);
    } else {
        console.log('Success! Database is now empty.');
    }
}

clearDb();
