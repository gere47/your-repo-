console.log('🔧 Fixing .env file...');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if using placeholder URL
  if (envContent.includes('hostname')) {
    console.log(' Found placeholder URL in .env');
    console.log(' Please open your .env file and replace:');
    console.log('   DATABASE_URL=\"postgresql://username:password@hostname/database?schema=public&sslmode=require\"');
    console.log(' With your actual Neon URL from database-url.txt');
    console.log(' Then save the file and run: node test-neon-connection.js');
  } else {
    console.log(' .env file looks good');
    console.log(' DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  }
} else {
  console.log(' .env file not found');
}
