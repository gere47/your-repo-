// test-passwords.js
const { Client } = require('pg');

const passwords = ['', 'postgres', 'password', '123456', 'admin', 'root'];

async function testPasswords() {
  for (const pwd of passwords) {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: pwd,
      database: 'postgres'
    });
    
    try {
      await client.connect();
      console.log(' SUCCESS! Password is: ' + (pwd === '' ? '(empty)' : pwd));
      await client.end();
      return pwd;
    } catch (error) {
      console.log(' Failed with password: ' + (pwd === '' ? '(empty)' : pwd));
    }
  }
  return null;
}

testPasswords().then(foundPassword => {
  if (foundPassword !== null) {
    console.log('\n Use this password in your .env file:');
    console.log(`DB_PASSWORD=${foundPassword}`);
  } else {
    console.log('\n No password worked. You may need to reset PostgreSQL.');
  }
});