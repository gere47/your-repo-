// test-neon-connection.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testNeonConnection() {
  try {
    console.log('🔌 Testing Neon database connection...');
    
    await prisma.$connect();
    console.log('✅ Successfully connected to Neon database!');
    
    // Test query
    const result = await prisma.$queryRaw`SELECT version() as postgres_version`;
    console.log('📊 PostgreSQL Version:', result[0].postgres_version);
    
    const dbInfo = await prisma.$queryRaw`SELECT current_database() as db_name, current_user as user`;
    console.log('📁 Database:', dbInfo[0].db_name);
    console.log('👤 User:', dbInfo[0].user);
    
    await prisma.$disconnect();
    console.log('🎉 Neon connection test passed!');
    
  } catch (error) {
    console.error('❌ Neon connection failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'P1001') {
      console.log('🔧 Check your DATABASE_URL in .env file');
      console.log('🔧 Make sure you pasted the EXACT Neon URL');
    }
  }
}

testNeonConnection();