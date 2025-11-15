const { execSync } = require('child_process');

console.log('🚀 Starting production setup...');

try {
  // Run database migrations
  console.log('📦 Running database migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('✅ Production setup completed!');
} catch (error) {
  console.error('❌ Production setup failed:', error);
  process.exit(1);
}
