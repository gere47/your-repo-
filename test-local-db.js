const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

console.log("🔌 Testing LOCAL PostgreSQL connection...");
console.log("URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.();
    console.log("✅ Connected to LOCAL PostgreSQL successfully!");

    const result = await prisma.('SELECT version() as version');
    console.log("📊 PostgreSQL Version:", result[0].version);

    await prisma.();
  } catch (error) {
    console.log("❌ Connection failed:");
    console.log("Error:", error.message);
  }
}

test();
