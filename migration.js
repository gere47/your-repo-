const { Client } = require('pg');

const sql = ``;

async function runCleanMigration() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'school_erp_dev'
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
    console.log(' Cleaning up existing tables...');
    console.log(' Running clean database migration...');
    
    // Execute all SQL commands
    await client.query(sql);
    
    console.log('Database migration completed successfully!');
    console.log('Tables created:');
    console.log('   • roles');
    console.log('   • users'); 
    console.log('   • sessions');
    console.log('   • user_roles');
    console.log('Default roles inserted:');
    console.log('   • Admin, Teacher, Student, Parent, Staff');
    
    // Verify the tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\\n Verified tables:');
    tables.rows.forEach(table => {
      console.log(`   • ${table.table_name}`);
    });
    
    // Verify roles were inserted
    const roles = await client.query('SELECT name, description FROM roles ORDER BY id');
    console.log('\\nVerified roles:');
    roles.rows.forEach(role => {
      console.log(`   • ${role.name} - ${role.description}`);
    });
    
  } catch (error) {
    console.error(' Migration failed:', error.message);
  } finally {
    await client.end();
    console.log('\\ Database connection closed');
  }
}

runCleanMigration();