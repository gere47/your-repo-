#!/usr/bin/env node

const axios = require('axios');

async function healthCheck() {
  const baseURL = process.env.API_URL || 'http://localhost:5000';
  
  try {
    const response = await axios.get(`${baseURL}/api/v1/auth/health`, {
      timeout: 5000
    });
    
    if (response.data.status === 'ok') {
      console.log('✅ Health check passed');
      process.exit(0);
    } else {
      console.log('❌ Health check failed: Invalid status');
      process.exit(1);
    }
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    process.exit(1);
  }
}

healthCheck();