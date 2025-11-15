const { spawn } = require('child_process');

console.log('Starting server with error capture...');

const server = spawn('npm', ['run', 'start:dev'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.log('Failed to start server:', error);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});